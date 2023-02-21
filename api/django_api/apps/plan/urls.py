from django.urls import path
from rest_framework import routers

from . import views

router = routers.SimpleRouter()
# explicitly set the basename argument when registering, as we've defined custom get_queryset to handle user only objects
router.register(r"plan", views.PlanViewSet, "plan")


urlpatterns = router.urls
