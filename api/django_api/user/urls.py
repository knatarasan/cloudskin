from django.urls import include, path
from . import views

urlpatterns = [
    path('user/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>', views.UserDetail.as_view(), name='user-detail'),
]
