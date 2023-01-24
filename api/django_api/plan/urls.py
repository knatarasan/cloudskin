from django.urls import include, path
from . import views

urlpatterns = [
    path('plan/', views.PlanList.as_view(), name='plan-list'),
    path('plan/<int:pk>', views.PlanDetail.as_view(), name='plan-detail'),
]
