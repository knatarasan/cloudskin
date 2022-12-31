from django.urls import include, path, re_path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

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
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path('', views.api_root),
    path('plan/', views.PlanList.as_view(), name='plan-list'),
    path('plan/<int:pk>', views.PlanDetail.as_view(), name='plan-detail'),
    path('ec2/', views.EC2List.as_view(), name='ec2-list'),
    path('ec2/<str:pk>', views.EC2Detail.as_view(), name='ec2-detail'),
    path('aws_creds/', views.AwsCredsList.as_view(), name='aws-creds-list'),
    path('aws_creds/<int:pk>', views.AwsCredsDetail.as_view(), name='aws-creds-detail'),
    path('user/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>', views.UserDetail.as_view(), name='user-detail'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # For swagger documentation
    # re_path(r'^doc(?P<format>\.json|\.yaml)$',
    #         schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),

]
