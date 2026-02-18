from django.urls import path
from api.views import orchestration_health

urlpatterns = [path("health", orchestration_health)]
