from django.urls import include, path, re_path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# This is for SWAGGER
schema_view = get_schema_view(
    openapi.Info(
        title="CloudSkin API",
        default_version='v1',
        description="Welcome to the world of cloudskin",
        terms_of_service="https://www.cloudskin.com",
        contact=openapi.Contact(email="me@cs.com"),
        license=openapi.License(name="YTD"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny,],
)

urlpatterns = [
    path('', views.api_root),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),


    # For swagger documentation
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),

]
