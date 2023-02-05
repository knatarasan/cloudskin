from .base import *  # noqa
from .base import env

AWS_TEST_MODE = env.bool("AWS_TEST_MODE", False)  # type: ignore


# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env("CS_SECRET_KEY")

SIMPLE_JWT["SIGNING_KEY"] = env("CS_JWT_SIGNING_KEY")

# DATABASES
# ------------------------------------------------------------------------------
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CS_DB_CONN_MAX_AGE", default=60)  # type: ignore


#################### dj-rest-auth start ####################
JWT_AUTH_SECURE = True  # Cookies will be sent only with https scheme
#################### dj-rest-auth end ####################


# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#logging
# See https://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING["root"] = {
    "level": "INFO",
    "handlers": ["file"],
    "propagate": True,
}
