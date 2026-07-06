from django.db import models


class Skill(models.Model):

    DIFFICULTY = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]

    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to="skills/",
        blank=True,
        null=True
    )

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY,
        default="Beginner"
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name