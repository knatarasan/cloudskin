from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('', include('authtoken.urls')),
    path('', include('user.urls')),
    path('', include('aws.urls')),
    path('', include('plan.urls'))
]
