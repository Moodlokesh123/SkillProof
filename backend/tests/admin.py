from django.contrib import admin
from .models import (
    Assessment,
    AssessmentAttempt,
    AttemptQuestion,
    CandidateAnswer,
    AssessmentQuestion,
)

admin.site.register(Assessment)
admin.site.register(AssessmentAttempt)
admin.site.register(AttemptQuestion)
admin.site.register(CandidateAnswer)
admin.site.register(AssessmentQuestion)