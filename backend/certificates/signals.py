import qrcode
from io import BytesIO

from django.core.files import File
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Certificate
@receiver(post_save, sender=Certificate)
def generate_qr(sender, instance, created, **kwargs):

    if not created:
        return

    verify_url = (
        f"http://127.0.0.1:8000/api/certificates/verify/"
        f"{instance.certificate_id}/"
    )

    qr = qrcode.make(verify_url)

    buffer = BytesIO()

    qr.save(buffer, format="PNG")

    filename = f"{instance.certificate_id}.png"

    instance.qr_code.save(
        filename,
        File(buffer),
        save=True
    )