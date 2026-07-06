from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Skill
from .serializers import SkillSerializer


# Candidate API
class SkillListAPIView(generics.ListAPIView):

    queryset = Skill.objects.filter(is_active=True)
    serializer_class = SkillSerializer


# Admin APIs

class SkillCreateAPIView(generics.CreateAPIView):

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminUser]


class SkillUpdateAPIView(generics.RetrieveUpdateAPIView):

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminUser]


class SkillDeleteAPIView(generics.DestroyAPIView):

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminUser]