from django.urls import path
from . import views

urlpatterns = [
    path('ec2/', views.EC2ViewSet.as_view({'get': 'list', 'post': 'create'}), name='ec2-list'),
    path('ec2/<str:pk>', views.EC2ViewSet.as_view({'get': 'retrieve',
                                                   'put': 'update',
                                                   'patch': 'partial_update',
                                                    'delete': 'destroy'}), name='ec2-detail'),
    path('ec2/<str:pk>/create_instance', views.EC2ViewSet.as_view({'post': 'create_instance'}), name='ec2-create-instance'),
    path('ec2/<str:pk>/update_instance_details', views.EC2ViewSet.as_view({'get': 'update_instance_details'}), name='ec2-update-instance-details'),

    path('installed_service/', views.InstalledServiceViewSet.as_view({'get': 'list', 'post': 'create'}), name='installed-service-list'),
    path('installed_service/<str:pk>', views.InstalledServiceViewSet.as_view({'get': 'retrieve','put': 'update','patch': 'partial_update','delete': 'destroy'}), name='installed-service-detail'),
    path('installed_service/<str:pk>/install_service', views.InstalledServiceViewSet.as_view({'post': 'install_service'}), name='installed-service-install-service'),

    path('lb/', views.LBList.as_view(), name='lb-list'),
    path('lb/<str:pk>', views.LBDetail.as_view(), name='lb-detail'),
    path('aws_creds/', views.AwsCredsList.as_view(), name='aws-creds-list'),
    path('aws_creds/<int:pk>', views.AwsCredsDetail.as_view(), name='aws-creds-detail'),
]
