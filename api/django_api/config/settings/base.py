import os
from pathlib import Path

import environ

from .logger import *
from .simple_jwt import *

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()

if not os.path.isfile(".env"):
    print('".env" file is missing , make sure .env file in the path where  manage.py')
    exit(0)

# OS environment variables take precedence over variables from .env
env.read_env(env.str("CS_ENV_PATH", ".env"))  # type: ignore


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-^i93n1dzwm_$fkupi+ck#!ngk^=))ih#$+a4f$46^15m&#c*ks"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# Application definition


DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # "django.forms",
]


THIRD_PARTY_APPS = [
    "corsheaders",
    "drf_yasg",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "dj_rest_auth",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
]

# Registration is implemented with dj_rest_auth.registration

SITE_ID = 1
# Aboe value is used for dj_rest_auth.registration
# https://django-rest-auth.readthedocs.io/en/latest/installation.html#django-rest-auth-registration
# without aobve value we get error
# Exception Type:	DoesNotExist
# Exception Value:
# Site matching query does not exist.

ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_REQUIRED = False
# Above settings are used for dj_rest_auth.registration
# ConnectionRefusedError at /api/v1/auth/registration [Errno 61] Connection refused

LOCAL_APPS = ["apps.plan", "apps.aws", "apps.user"]

# https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.0.14:3000",
]

# Without this  httpOnly cookie can't be set from Backend
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    # URL Format - "postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT_NUMBER>/<DATABASE>"
    "default": env.db_url("CS_DATABASE_URL"),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.AnonRateThrottle", "rest_framework.throttling.UserRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {"anon": "100/day", "user": "60/min"},
}

#################### dj-rest-auth start ####################
REST_AUTH_TOKEN_MODEL = None  # Disables token authentication
REST_SESSION_LOGIN = False  # Disables session login

REST_USE_JWT = True
# JWT_AUTH_COOKIE = "token"
JWT_AUTH_REFRESH_COOKIE = "refresh-token"
JWT_AUTH_SECURE = False  # If True, cookies will be sent only with https scheme
JWT_AUTH_HTTPONLY = True  # Client Side javascript cannot access the cookie

OLD_PASSWORD_FIELD_ENABLED = True  # Verifies old password on password change endpoint
#################### dj-rest-auth end ####################


#################### swagger start ####################
SWAGGER_SETTINGS = {"SECURITY_DEFINITIONS": {"Bearer": {"type": "apiKey", "name": "Authorization", "in": "header"}}}
#################### swagger end ####################

GRAPH_MODELS = {
    "all_applications": True,
    "graph_models": True,
}

AWS_TEST_MODE = env.bool("AWS_TEST_MODE", False)


PUBLIC_KEY_FILE = os.path.join(BASE_DIR, "private_key.pem")
PRIVATE_KEY_FILE = os.path.join(BASE_DIR, "public_key.pem")
