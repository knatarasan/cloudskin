from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'graphs', views.GraphViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', views.api_root),
    path('users/', views.UserList.as_view(), name="user-list"),
    path('users/<int:pk>', views.UserDetail.as_view(), name="user-detail"),
    path('login/', views.MyObtainTokenPairViewSet.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterViewSet.as_view(), name='auth_register'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
