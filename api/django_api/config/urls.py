from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from .swagger import schema_view

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("", include("api.urls")),
#     path("", include("authtoken.urls")),
#     path("", include("user.urls")),
#     path("", include("aws.urls")),
#     path("", include("plan.urls")),
# ]


app_urls = [
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration", include("dj_rest_auth.registration.urls")),
    path("", include("apps.plan.urls")),
    path("", include("apps.aws.urls")),
    path("", include("apps.user.urls")),
    ###### Swagger Start ######
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    ###### Swagger End ######
]
"""
    With the following insert,
    path("auth/registration", include("dj_rest_auth.registration.urls")),
    we get following endpoints:
        http://localhost:8000/api/v1/auth/registration/
"""

urlpatterns = [
    path(
        "api/v1/",
        include(app_urls),
    )
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
