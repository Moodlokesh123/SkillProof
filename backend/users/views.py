from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = ProfileSerializer(request.user)

        return Response(serializer.data)
class UserProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
            "is_superuser": request.user.is_superuser,
        })
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from skills.models import Skill
from tests.models import Assessment, AssessmentAttempt
from questions.models import Question
from certificates.models import Certificate

User = get_user_model()


class AdminDashboardAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        return Response({

            "users": User.objects.count(),

            "skills": Skill.objects.count(),

            "assessments": Assessment.objects.count(),

            "questions": Question.objects.count(),

            "certificates": Certificate.objects.count(),

            "attempts": AssessmentAttempt.objects.count()

        })
# ==========================================
# Admin User APIs
# ==========================================

class AdminUserListAPIView(generics.ListAPIView):

    queryset = User.objects.all().order_by("-id")
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class AdminUserUpdateAPIView(generics.RetrieveUpdateAPIView):

    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class AdminUserDeleteAPIView(generics.DestroyAPIView):

    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]