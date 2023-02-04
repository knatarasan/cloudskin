from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

# This is for SWAGGER
schema_view = get_schema_view(
    openapi.Info(
        title="CloudSkin API",
        default_version="v1",
        description="Welcome to the world of cloudskin",
        terms_of_service="https://www.cloudskin.com",
        contact=openapi.Contact(email="me@cs.com"),
        license=openapi.License(name="CloudSkin License"),
    ),
    public=True,
    permission_classes=[
        permissions.AllowAny,
    ],
)
