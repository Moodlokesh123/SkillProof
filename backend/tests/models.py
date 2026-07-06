from django.db import models
from django.conf import settings

from skills.models import Skill
from questions.models import Question, Option


class Assessment(models.Model):

    DIFFICULTY = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=200)

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="assessments"
    )

    description = models.TextField()

    duration = models.IntegerField(
        help_text="Duration in minutes"
    )

    total_marks = models.IntegerField(default=100)

    pass_marks = models.IntegerField(default=60)

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AssessmentAttempt(models.Model):

    STATUS = [
        ("STARTED", "Started"),
        ("SUBMITTED", "Submitted"),
        ("TIMEOUT", "Timeout"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE
    )

    started_at = models.DateTimeField(auto_now_add=True)

    ended_at = models.DateTimeField(
        null=True,
        blank=True
    )

    score = models.FloatField(default=0)

    # New fields
    percentage = models.FloatField(default=0)

    correct_answers = models.IntegerField(default=0)

    wrong_answers = models.IntegerField(default=0)

    is_passed = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="STARTED"
    )

    def __str__(self):
        return f"{self.user.username} - {self.assessment.title}"


class AttemptQuestion(models.Model):

    attempt = models.ForeignKey(
        AssessmentAttempt,
        on_delete=models.CASCADE,
        related_name="attempt_questions"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )


class CandidateAnswer(models.Model):

    attempt_question = models.ForeignKey(
        AttemptQuestion,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    selected_option = models.ForeignKey(
        Option,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    is_correct = models.BooleanField(default=False)


class AssessmentQuestion(models.Model):

    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="assessment_questions"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    marks = models.IntegerField(default=1)

    class Meta:
        unique_together = ('assessment', 'question')

    def __str__(self):
        return f"{self.assessment.title} - {self.question.id}"