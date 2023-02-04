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
    path("", include("apps.plan.urls")),
    path("", include("apps.aws.urls")),
    path("", include("apps.user.urls")),
    ###### Swagger Start ######
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    ###### Swagger End ######
]


urlpatterns = [
    path(
        "api/v1/",
        include(app_urls),
    )
]
