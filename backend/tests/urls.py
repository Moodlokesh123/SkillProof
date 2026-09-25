from django.urls import path

from .views import (
    # Candidate APIs
    AssessmentListAPIView,
    StartAssessmentAPIView,
    SubmitAssessmentAPIView,
    ResultAPIView,
    ResultsListAPIView,
    CandidateResultsAPIView,
    CandidateDashboardAPIView,

    # Admin APIs
    AdminAssessmentListAPIView,
    AdminAssessmentCreateAPIView,
    AdminAssessmentUpdateAPIView,
    AdminAssessmentDeleteAPIView,
    AdminDashboardAPIView,
)


urlpatterns = [

    # ==========================================
    # Candidate Assessment APIs
    # ==========================================

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

    # Single result
    path(
        "result/<int:attempt_id>/",
        ResultAPIView.as_view(),
    ),

    # All previous results
    path(
        "results/",
        CandidateResultsAPIView.as_view(),
    ),

    # Candidate dashboard
    path(
        "dashboard/",
        CandidateDashboardAPIView.as_view(),
    ),


    # ==========================================
    # Admin Assessment APIs
    # ==========================================

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

    # Admin dashboard
    path(
        "admin/dashboard/",
        AdminDashboardAPIView.as_view(),
    ),
    path("results/", ResultsListAPIView.as_view()),
]