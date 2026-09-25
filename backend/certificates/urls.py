from django.urls import path

from .views import (
    CertificateAPIView,
    CertificateListAPIView,
    VerifyCertificateAPIView,
    AdminCertificateListAPIView,
    AdminCertificateDeleteAPIView,
)

urlpatterns = [

    # Candidate
    path(
        "<int:attempt_id>/",
        CertificateAPIView.as_view(),
    ),

    path(
        "verify/<uuid:certificate_id>/",
        VerifyCertificateAPIView.as_view(),
    ),

    # Admin
    path(
        "admin/",
        AdminCertificateListAPIView.as_view(),
    ),

    path(
        "admin/<int:pk>/delete/",
        AdminCertificateDeleteAPIView.as_view(),
    ),
    path("", CertificateListAPIView.as_view()),

]