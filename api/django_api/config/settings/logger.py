LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {
            "format": "{asctime} {levelname} : {filename} line - {lineno:d} : {module} : {message}",
            "style": "{",
        },
        "verbose": {
            "format": "{levelname} {asctime} {module} {funcName} {lineno} {process:d} {thread:d} :: {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {"level": "DEBUG", "class": "logging.StreamHandler", "formatter": "verbose"},
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "logs/app.log",
            "maxBytes": 5 * 1024 * 1024,  # 5 MB
            "backupCount": 10,
            "formatter": "standard",
        },
        # "file": {"level": "INFO", "class": "logging.FileHandler", "formatter": "verbose", "filename": "../log/app.log"},
    },
    "loggers": {
        "": {"level": "DEBUG", "handlers": ["console", "file"]},
        "django": {"level": "INFO", "handlers": ["console", "file"]},
        "django.request": {"level": "INFO", "handlers": ["console", "file"]},
    },
}
