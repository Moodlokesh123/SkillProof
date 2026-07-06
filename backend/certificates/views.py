from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Certificate
from .serializers import CertificateSerializer


class CertificateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, attempt_id):

        try:

            certificate = Certificate.objects.get(
                attempt_id=attempt_id,
                user=request.user
            )

        except Certificate.DoesNotExist:

            return Response(
                {
                    "error": "Certificate not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CertificateSerializer(certificate)

        return Response(serializer.data)
class VerifyCertificateAPIView(APIView):

    permission_classes = []

    def get(self, request, certificate_id):

        try:

            certificate = Certificate.objects.select_related(
                "user",
                "attempt__assessment"
            ).get(
                certificate_id=certificate_id
            )

        except Certificate.DoesNotExist:

            return Response(
                {
                    "valid": False,
                    "message": "Certificate not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({

            "valid": True,

            "username": certificate.user.username,

            "assessment": certificate.attempt.assessment.title,

            "score": certificate.attempt.score,

            "percentage": certificate.attempt.percentage,

            "issued_at": certificate.issued_at,

            "certificate_id": str(certificate.certificate_id)

        })
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import Certificate
from .serializers import CertificateSerializer


class AdminCertificateListAPIView(generics.ListAPIView):

    queryset = Certificate.objects.select_related(
        "user",
        "attempt",
        "attempt__assessment"
    )

    serializer_class = CertificateSerializer

    permission_classes = [IsAdminUser]


class AdminCertificateDeleteAPIView(generics.DestroyAPIView):

    queryset = Certificate.objects.all()

    serializer_class = CertificateSerializer

    permission_classes = [IsAdminUser]