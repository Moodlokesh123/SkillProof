from django.urls import path

from .views import (
    QuestionListAPIView,

    AdminQuestionListAPIView,
    AdminQuestionCreateAPIView,
    AdminQuestionUpdateAPIView,
    AdminQuestionDeleteAPIView,

    AdminOptionListAPIView,
    AdminOptionCreateAPIView,
    AdminOptionUpdateAPIView,
    AdminOptionDeleteAPIView,
)

urlpatterns = [

    # ---------------- Candidate ----------------

    path(
        "<int:skill_id>/",
        QuestionListAPIView.as_view(),
    ),

    # ---------------- Question Admin ----------------

    path(
        "admin/",
        AdminQuestionListAPIView.as_view(),
    ),

    path(
        "admin/create/",
        AdminQuestionCreateAPIView.as_view(),
    ),

    path(
        "admin/<int:pk>/update/",
        AdminQuestionUpdateAPIView.as_view(),
    ),

    path(
        "admin/<int:pk>/delete/",
        AdminQuestionDeleteAPIView.as_view(),
    ),

    # ---------------- Option Admin ----------------

    path(
        "options/<int:question_id>/",
        AdminOptionListAPIView.as_view(),
    ),

    path(
        "options/create/",
        AdminOptionCreateAPIView.as_view(),
    ),

    path(
        "options/<int:pk>/update/",
        AdminOptionUpdateAPIView.as_view(),
    ),

    path(
        "options/<int:pk>/delete/",
        AdminOptionDeleteAPIView.as_view(),
    ),

]