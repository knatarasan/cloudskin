from .base import *  # noqa
from .base import env

DEVELOPMENT_MODE = env.bool("DEVELOPMENT_MODE", True)  # type: ignore

# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "CS_SECRET_KEY",
    default="cel%lvgbygkx7iau5wy9zg!-+z+2s576=-z(2@vp#0d11+)@ws",  # type: ignore
)


SIMPLE_JWT["SIGNING_KEY"] = env("CS_JWT_SIGNING_KEY", default="mwuvy443zs8u3h%c!i3jf8jpf3+$q^d49*w0l74bh5ffbpy)g%")  # type: ignore
