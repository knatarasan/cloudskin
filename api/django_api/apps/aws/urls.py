from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"installable_service", views.InstallableServiceViewSet, basename="installable-service"),
router.register(r"ec2_metadata", views.EC2MetaDataViewSet, basename="ec2-metadata"),
router.register(r"aws/vpc", views.VPCViewSet, basename="vpc"),
router.register(r"aws/subnet", views.SubnetViewSet, basename="subnet"),
router.register(r"aws/security_group", views.SecurityGroupViewSet, basename="security-group"),

urlpatterns = [
    path("", include(router.urls)),
    path("rds/", views.RDSViewSet.as_view({"get": "list", "post": "create"}), name="rds-list"),
    path(
        "rds/<str:pk>",
        views.RDSViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}),
        name="rds-detail",
    ),
    path("rds/<str:pk>/create_instance", views.RDSViewSet.as_view({"put": "create_instance"}), name="rds-create-instance"),
    path(
        "rds/<str:pk>/update_instance_details",
        views.RDSViewSet.as_view({"get": "update_instance"}),
        name="rds-update-instance-details",
    ),
    path(
        "rds/<str:pk>/terminate_instance", views.RDSViewSet.as_view({"put": "terminate_instance"}), name="rds-terminate-instance"
    ),
    path("ec2/", views.EC2ViewSet.as_view({"get": "list", "post": "create"}), name="ec2-list"),
    path(
        "ec2/<str:pk>",
        views.EC2ViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}),
        name="ec2-detail",
    ),
    path("ec2/<str:pk>/create_instance", views.EC2ViewSet.as_view({"put": "create_instance"}), name="ec2-create-instance"),
    path(
        "ec2/<str:pk>/update_instance_details",
        views.EC2ViewSet.as_view({"get": "update_instance"}),
        name="ec2-update-instance-details",
    ),
    path("ec2/<str:pk>/health", views.EC2ViewSet.as_view({"get": "health"}), name="ec2-health"),
    path("ec2/<str:pk>/install_service", views.EC2ViewSet.as_view({"put": "install_service"}), name="ec2-install-service"),
    path("ec2/<str:pk>/uninstall_service", views.EC2ViewSet.as_view({"put": "uninstall_service"}), name="ec2-uninstall-service"),
    path(
        "ec2/<str:pk>/terminate_instance", views.EC2ViewSet.as_view({"put": "terminate_instance"}), name="ec2-terminate-instance"
    ),
    path("ec2_meta_basics/", views.EC2MetaBasicViewSet.as_view({"get": "list", "post": "create"}), name="ec2_meta_basics"),
    path(
        "installed_service/",
        views.InstalledServiceViewSet.as_view({"get": "list", "post": "create"}),
        name="installed-service-list",
    ),
    path(
        "installed_service/<str:pk>",
        views.InstalledServiceViewSet.as_view(
            {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
        ),
        name="installed-service-detail",
    ),
    # path('installed_service/<str:pk>/install_service', views.InstalledServiceViewSet.as_view({'post': 'install_service'}), name='installed-service-install-service'),
    # path('installed_service/<str:pk>/uninstall_service', views.InstalledServiceViewSet.as_view({'post': 'uninstall_service'}), name='installed-service-uninstall-service'),
    path("lb/", views.LBList.as_view(), name="lb-list"),
    path("lb/<str:pk>", views.LBDetail.as_view(), name="lb-detail"),
    path("aws_creds/", views.AwsCredsList.as_view(), name="aws-creds-list"),
    path("aws_creds/<int:pk>", views.AwsCredsDetail.as_view(), name="aws-creds-detail"),
]
