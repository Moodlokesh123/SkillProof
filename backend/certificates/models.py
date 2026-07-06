import uuid

from django.db import models
from django.conf import settings

from tests.models import AssessmentAttempt


class Certificate(models.Model):

    certificate_id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    attempt = models.OneToOneField(
        AssessmentAttempt,
        on_delete=models.CASCADE
    )

    issued_at = models.DateTimeField(auto_now_add=True)

    qr_code = models.ImageField(
        upload_to="certificates/qr/",
        blank=True,
        null=True
    )

    def __str__(self):
        return str(self.certificate_id)