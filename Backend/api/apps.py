from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"


class CORSHeadersConfig(AppConfig):
    name = 'corsheaders'
    label = 'unique_corsheaders_label'  # Ensure this label is unique
