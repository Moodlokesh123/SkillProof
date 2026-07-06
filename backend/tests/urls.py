from django.urls import path

from .views import (
    AssessmentListAPIView,
    StartAssessmentAPIView,
    SubmitAssessmentAPIView,
    ResultAPIView,
    CandidateDashboardAPIView,

    AdminAssessmentListAPIView,
    AdminAssessmentCreateAPIView,
    AdminAssessmentUpdateAPIView,
    AdminAssessmentDeleteAPIView,

    AdminDashboardAPIView,   # <-- ADD THIS LINE
)
urlpatterns = [
    path(
        "<int:skill_id>/",
        AssessmentListAPIView.as_view(),
    ),

    path(
        "start/<int:assessment_id>/",
        StartAssessmentAPIView.as_view(),
    ),

    path(
        "submit/<int:attempt_id>/",
        SubmitAssessmentAPIView.as_view(),
    ),
    path(
    "result/<int:attempt_id>/",
    ResultAPIView.as_view(),
),
    path(
    "dashboard/",
    CandidateDashboardAPIView.as_view(),
),
path(
    "admin/",
    AdminAssessmentListAPIView.as_view(),
),

path(
    "admin/create/",
    AdminAssessmentCreateAPIView.as_view(),
),

path(
    "admin/<int:pk>/update/",
    AdminAssessmentUpdateAPIView.as_view(),
),

path(
    "admin/<int:pk>/delete/",
    AdminAssessmentDeleteAPIView.as_view(),
),
path(
    "admin/dashboard/",
    AdminDashboardAPIView.as_view(),
),
]