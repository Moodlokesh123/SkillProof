import random

from django.utils import timezone

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from questions.models import Question, Option
from questions.serializers import QuestionSerializer

from certificates.models import Certificate

from .models import (
    Assessment,
    AssessmentAttempt,
    AttemptQuestion,
    AssessmentQuestion,
    CandidateAnswer,
)

from .serializers import (
    AssessmentSerializer,
    SubmitAssessmentSerializer,
)

from .services import evaluate_attempt

from users.models import User
from skills.models import Skill


# ==========================================
# Assessment List API
# ==========================================

class AssessmentListAPIView(generics.ListAPIView):

    serializer_class = AssessmentSerializer

    def get_queryset(self):

        skill_id = self.kwargs["skill_id"]

        return Assessment.objects.filter(
            skill_id=skill_id,
            is_active=True
        )


# ==========================================
# Start Assessment API
# ==========================================

class StartAssessmentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, assessment_id):

        try:

            assessment = Assessment.objects.get(
                id=assessment_id,
                is_active=True
            )

        except Assessment.DoesNotExist:

            return Response(
                {
                    "error": "Assessment not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Create Attempt
        attempt = AssessmentAttempt.objects.create(
            user=request.user,
            assessment=assessment
        )

        # Get Questions
        question_links = list(
            AssessmentQuestion.objects.filter(
                assessment=assessment
            )
        )

        # Randomize questions
        random.shuffle(question_links)

        # Select maximum 10 questions
        selected_questions = question_links[:10]

        questions = []

        for link in selected_questions:

            AttemptQuestion.objects.create(
                attempt=attempt,
                question=link.question
            )

            questions.append(link.question)

        serializer = QuestionSerializer(
            questions,
            many=True
        )

        return Response({

            "attempt_id": attempt.id,

            "assessment": assessment.title,

            "duration": assessment.duration,

            "questions": serializer.data

        })


# ==========================================
# Submit Assessment API
# ==========================================

class SubmitAssessmentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, attempt_id):

        serializer = SubmitAssessmentSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        try:

            attempt = AssessmentAttempt.objects.get(
                id=attempt_id,
                user=request.user
            )

        except AssessmentAttempt.DoesNotExist:

            return Response(
                {
                    "error": "Assessment attempt not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent duplicate submission
        if attempt.status == "SUBMITTED":

            return Response(
                {
                    "error": "Assessment already submitted."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # ==========================================
        # Save Candidate Answers
        # ==========================================

        for answer in serializer.validated_data["answers"]:

            try:

                question = Question.objects.get(
                    id=answer["question_id"]
                )

                selected_option = Option.objects.get(
                    id=answer["option_id"]
                )

                attempt_question = AttemptQuestion.objects.get(
                    attempt=attempt,
                    question=question
                )

            except (
                Question.DoesNotExist,
                Option.DoesNotExist,
                AttemptQuestion.DoesNotExist
            ):

                return Response(
                    {
                        "error": "Invalid question or option."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            CandidateAnswer.objects.create(

                attempt_question=attempt_question,

                selected_option=selected_option,

                is_correct=selected_option.is_correct

            )

        # ==========================================
        # Finish Attempt
        # ==========================================

        attempt.ended_at = timezone.now()

        attempt.save()

        # ==========================================
        # Evaluate Assessment
        # ==========================================

        attempt = evaluate_attempt(attempt)

        # ==========================================
        # Generate Certificate
        # ==========================================

        if attempt.is_passed:

            Certificate.objects.get_or_create(
                user=request.user,
                attempt=attempt
            )

        # ==========================================
        # Return Result
        # ==========================================

        return Response({

            "attempt_id": attempt.id,

            "assessment": attempt.assessment.title,

            "message": "Assessment Submitted Successfully",

            "score": attempt.score,

            "percentage": attempt.percentage,

            "correct_answers": attempt.correct_answers,

            "wrong_answers": attempt.wrong_answers,

            "status": (
                "PASS"
                if attempt.is_passed
                else "FAIL"
            )

        })


# ==========================================
# Single Result API
# ==========================================

class ResultAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, attempt_id):

        try:

            attempt = AssessmentAttempt.objects.get(
                id=attempt_id,
                user=request.user
            )

        except AssessmentAttempt.DoesNotExist:

            return Response(
                {
                    "error": "Attempt not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({

            "attempt_id": attempt.id,

            "assessment": attempt.assessment.title,

            "score": attempt.score,

            "percentage": attempt.percentage,

            "correct_answers": attempt.correct_answers,

            "wrong_answers": attempt.wrong_answers,

            "status": (
                "PASS"
                if attempt.is_passed
                else "FAIL"
            ),

            "submitted_at": attempt.ended_at

        })


# ==========================================
# Candidate Results History API
# ==========================================

class CandidateResultsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        attempts = (
            AssessmentAttempt.objects
            .filter(
                user=request.user,
                status="SUBMITTED"
            )
            .select_related(
                "assessment"
            )
            .order_by("-ended_at")
        )

        results = []

        for attempt in attempts:

            results.append({

                "attempt_id": attempt.id,

                "assessment": attempt.assessment.title,

                "score": attempt.score,

                "percentage": attempt.percentage,

                "correct_answers": attempt.correct_answers,

                "wrong_answers": attempt.wrong_answers,

                "status": (
                    "PASS"
                    if attempt.is_passed
                    else "FAIL"
                ),

                "submitted_at": attempt.ended_at,

            })

        return Response(results)


# ==========================================
# Candidate Dashboard API
# ==========================================

class CandidateDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Only completed/submitted assessments
        attempts = AssessmentAttempt.objects.filter(
            user=request.user,
            status="SUBMITTED"
        ).order_by("-started_at")

        total = attempts.count()

        passed = attempts.filter(
            is_passed=True
        ).count()

        failed = attempts.filter(
            is_passed=False
        ).count()

        certificates = Certificate.objects.filter(
            user=request.user
        ).count()

        recent = []

        for attempt in attempts[:5]:
            recent.append({
                "assessment": attempt.assessment.title,
                "score": attempt.score,
                "percentage": attempt.percentage,
                "status": "PASS" if attempt.is_passed else "FAIL",
                "date": attempt.started_at
            })

        return Response({
            "username": request.user.username,
            "total_assessments": total,
            "passed": passed,
            "failed": failed,
            "certificates": certificates,
            "recent_assessments": recent
        })

# ==========================================
# Admin Assessment APIs
# ==========================================

class AdminAssessmentListAPIView(generics.ListAPIView):

    queryset = Assessment.objects.all().order_by(
        "-created_at"
    )

    serializer_class = AssessmentSerializer

    permission_classes = [IsAdminUser]


class AdminAssessmentCreateAPIView(generics.CreateAPIView):

    queryset = Assessment.objects.all()

    serializer_class = AssessmentSerializer

    permission_classes = [IsAdminUser]


class AdminAssessmentUpdateAPIView(
    generics.RetrieveUpdateAPIView
):

    queryset = Assessment.objects.all()

    serializer_class = AssessmentSerializer

    permission_classes = [IsAdminUser]


class AdminAssessmentDeleteAPIView(
    generics.DestroyAPIView
):

    queryset = Assessment.objects.all()

    serializer_class = AssessmentSerializer

    permission_classes = [IsAdminUser]


# ==========================================
# Admin Dashboard API
# ==========================================

class AdminDashboardAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        return Response({

            "users": User.objects.count(),

            "skills": Skill.objects.count(),

            "assessments": Assessment.objects.count(),

            "questions": Question.objects.count(),

            "certificates": Certificate.objects.count(),

            "attempts": AssessmentAttempt.objects.count(),

        })
class ResultsListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        attempts = AssessmentAttempt.objects.filter(
            user=request.user,
            status="SUBMITTED"
        ).select_related("assessment").order_by("-ended_at")

        results = []

        for attempt in attempts:
            results.append({
                "attempt_id": attempt.id,
                "assessment": attempt.assessment.title,
                "score": attempt.score,
                "percentage": attempt.percentage,
                "correct_answers": attempt.correct_answers,
                "wrong_answers": attempt.wrong_answers,
                "status": "PASS" if attempt.is_passed else "FAIL",
                "submitted_at": attempt.ended_at,
            })

        return Response(results)    