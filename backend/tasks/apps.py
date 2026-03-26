"""App configuration for tasks app."""
from django.apps import AppConfig


class TasksConfig(AppConfig):
    """Configuration class for tasks application."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tasks'
