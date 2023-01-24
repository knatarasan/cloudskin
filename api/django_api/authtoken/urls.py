from django.urls import include, path
from . import views

urlpatterns = [
    path("token/", views.CookieTokenObtainPairView.as_view(), name="jwt_token_obtain_pair"),
    path("token/refresh/", views.CookieTokenRefreshView.as_view(), name="jwt_token_refresh"),
    ]
