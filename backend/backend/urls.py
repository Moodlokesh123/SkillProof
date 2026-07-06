from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/users/", include("users.urls")),

    path("api/token/", TokenObtainPairView.as_view()),

    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/skills/", include("skills.urls")),
   path("api/tests/", include("tests.urls")),
   path("api/questions/", include("questions.urls")),
   path("api/certificates/",include("certificates.urls")),
   path("api/admin/", include("users.admin_urls")),
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )