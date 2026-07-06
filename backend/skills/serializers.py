from rest_framework import serializers
from .models import Skill


class SkillSerializer(serializers.ModelSerializer):

    class Meta:

        model = Skill

        fields = [
            "id",
            "name",
            "description",
            "image",
            "difficulty",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_name(self, value):

        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Skill name must contain at least 3 characters."
            )

        return value