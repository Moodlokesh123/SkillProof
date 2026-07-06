from rest_framework import serializers
from .models import Assessment


class AssessmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assessment
        fields = "__all__"
from rest_framework import serializers

class AnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    option_id = serializers.IntegerField()


class SubmitAssessmentSerializer(serializers.Serializer):
    answers = AnswerSerializer(many=True)
from rest_framework import serializers

class ResultSerializer(serializers.Serializer):
    score = serializers.FloatField()
    percentage = serializers.FloatField()
    correct_answers = serializers.IntegerField()
    wrong_answers = serializers.IntegerField()
    status = serializers.CharField()