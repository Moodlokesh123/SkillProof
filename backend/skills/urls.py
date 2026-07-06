from django.urls import path

from .views import (
    SkillListAPIView,
    SkillCreateAPIView,
    SkillUpdateAPIView,
    SkillDeleteAPIView,
)

urlpatterns = [

    # Candidate API
    path("", SkillListAPIView.as_view()),

    # Admin APIs
    path("create/", SkillCreateAPIView.as_view()),

    path("<int:pk>/update/", SkillUpdateAPIView.as_view()),

    path("<int:pk>/delete/", SkillDeleteAPIView.as_view()),

]