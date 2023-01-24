from django.urls import path
from . import views


urlpatterns = [
    path('ec2/', views.EC2List.as_view(), name='ec2-list'),
    path('ec2/<str:pk>', views.EC2Detail.as_view(), name='ec2-detail'),
    path('lb/', views.LBList.as_view(), name='lb-list'),
    path('lb/<str:pk>', views.LBDetail.as_view(), name='lb-detail'),
    path('aws_creds/', views.AwsCredsList.as_view(), name='aws-creds-list'),
    path('aws_creds/<int:pk>', views.AwsCredsDetail.as_view(), name='aws-creds-detail'),
    ]
