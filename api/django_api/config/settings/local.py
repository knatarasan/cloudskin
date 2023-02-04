from .base import *  # noqa
from .base import env

DEVELOPMENT_MODE = env.bool("DEVELOPMENT_MODE", True)  # type: ignore

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True


# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "CS_SECRET_KEY",
    default="cel%lvgbygkx7iau5wy9zg!-+z+2s576=-z(2@vp#0d11+)@ws",  # type: ignore
)


SIMPLE_JWT["SIGNING_KEY"] = env("CS_JWT_SIGNING_KEY", default="mwuvy443zs8u3h%c!i3jf8jpf3+$q^d49*w0l74bh5ffbpy)g%")  # type: ignore
SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(days=30)

GRAPH_MODELS = {
    "all_applications": True,
    "graph_models": True,
}

# django-extensions
# ------------------------------------------------------------------------------
# https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration
# INSTALLED_APPS += ["django_extensions"]  # noqa F405

# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#logging
# See https://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING["root"] = {
    "level": "DEBUG",
    "handlers": ["console", "file"],
    "propagate": True,
}
