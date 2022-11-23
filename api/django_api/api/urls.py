from django.urls import include, path
from rest_framework import routers
from .views import MyObtainTokenPairViewSet, RegisterViewSet
from .views import GraphViewSet
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'graphs', GraphViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', MyObtainTokenPairViewSet.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterViewSet.as_view(), name='auth_register'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
