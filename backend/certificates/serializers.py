from rest_framework import serializers
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username")
    assessment = serializers.CharField(source="attempt.assessment.title")
    score = serializers.IntegerField(source="attempt.score")
    percentage = serializers.FloatField(source="attempt.percentage")
    date = serializers.DateTimeField(source="issued_at")

    class Meta:
        model = Certificate
        fields = [
            "certificate_id",
            "username",
            "assessment",
            "score",
            "percentage",
            "date",
            "qr_code",
        ]