from django.urls import path
from .views import AdminDashboardAPIView

from .views import (
    RegisterView,
    UserProfileAPIView,
)
from .views import (
    AdminUserListAPIView,
    AdminUserUpdateAPIView,
    AdminUserDeleteAPIView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("profile/", UserProfileAPIView.as_view()),
    path("dashboard/", AdminDashboardAPIView.as_view()),
]
urlpatterns += [

    path(
        "admin/",
        AdminUserListAPIView.as_view(),
    ),

    path(
        "admin/<int:pk>/update/",
        AdminUserUpdateAPIView.as_view(),
    ),

    path(
        "admin/<int:pk>/delete/",
        AdminUserDeleteAPIView.as_view(),
    ),

]