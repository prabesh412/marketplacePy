from django.apps import AppConfig


class ListingsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "doshro_bazar.listings"

    def ready(self):
        try: 
            import doshro_bazar.listings.tasks
            import doshro_bazar.listings.signals
        except ImportError:
            pass
