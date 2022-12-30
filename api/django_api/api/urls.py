from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.api_root),
    path('graph/', views.GraphList.as_view(), name='graph-list'),
    path('graph/<int:pk>', views.GraphDetail.as_view(), name='graph-detail'),
    path('ec2/', views.EC2List.as_view(), name='ec2-list'),
    path('ec2/<str:pk>', views.EC2Detail.as_view(), name='ec2-detail'),
    path('aws_creds/', views.AwsCredsList.as_view(), name='aws-creds-list'),
    path('aws_creds/<int:pk>', views.AwsCredsDetail.as_view(), name='aws-creds-detail'),
    path('user/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>', views.UserDetail.as_view(), name='user-detail'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

]
