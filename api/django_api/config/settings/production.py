from .base import *  # noqa
from .base import env

DEVELOPMENT_MODE = env.bool("DEVELOPMENT_MODE", False)  # type: ignore


# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env("CS_SECRET_KEY")

SIMPLE_JWT["SIGNING_KEY"] = env("CS_JWT_SIGNING_KEY")

# DATABASES
# ------------------------------------------------------------------------------
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CS_DB_CONN_MAX_AGE", default=60)  # type: ignore
