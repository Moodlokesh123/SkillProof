from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.permissions import IsAdminUser
from .models import Question, Option
from .serializers import QuestionSerializer, OptionSerializer


class QuestionListAPIView(generics.ListAPIView):

    serializer_class = QuestionSerializer

    def get_queryset(self):

        skill_id = self.kwargs["skill_id"]

        return Question.objects.filter(
            skill_id=skill_id,
            is_active=True
        )
# ==========================================
# Admin Question APIs
# ==========================================

class AdminQuestionListAPIView(generics.ListAPIView):

    queryset = Question.objects.all().order_by("-created_at")
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]


class AdminQuestionCreateAPIView(generics.CreateAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]


class AdminQuestionUpdateAPIView(generics.RetrieveUpdateAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]


class AdminQuestionDeleteAPIView(generics.DestroyAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]
# ==========================================
# Admin Option APIs
# ==========================================

class AdminOptionListAPIView(generics.ListAPIView):

    serializer_class = OptionSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        question_id = self.kwargs["question_id"]

        return Option.objects.filter(
            question_id=question_id
        )


class AdminOptionCreateAPIView(generics.CreateAPIView):

    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAdminUser]


class AdminOptionUpdateAPIView(generics.RetrieveUpdateAPIView):

    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAdminUser]


class AdminOptionDeleteAPIView(generics.DestroyAPIView):

    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAdminUser]