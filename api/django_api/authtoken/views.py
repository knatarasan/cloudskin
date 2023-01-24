from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CookieTokenRefreshSerializer, CSTokenObtainPairSerializer
from rest_framework.throttling import UserRateThrottle

import logging

logger = logging.getLogger(__name__)



class CookieTokenObtainPairView(TokenObtainPairView):
    """ This takes care /token end point, and needed for httpOnly cookie to be set from Backend
    For further details refer cloudskin/doc/Authentication.md
    """

    def finalize_response(self, request, response, *args, **kwargs):
        """ This is called for endpoint /token | When a user logsIn first time
        Upon successful login, it returns access token on response, stores refresh token in httpOnly cookie

        samesite="Lax"  : samesite has to be set as Lax for chrome https://medium.com/swlh/how-the-new-chrome-80-cookie-rule-samesite-none-secure-affects-web-development-c06380220ced

        refer https://docs.djangoproject.com/en/3.2/ref/request-response/#django.http.HttpResponse.set_cookie
        """

        if response.data.get("refresh"):
            logger.debug(f"here COOKIE is set START ")
            cookie_max_age = 3600 * 24 * 14  # 14 days
            response.set_cookie(
                "refresh_token",
                response.data["refresh"],
                max_age=cookie_max_age,
                httponly=True,
                samesite="Lax",  # Unless this value is "Lax" chrome won't set cookie from cross origin
                secure=False,
            )
            del response.data["refresh"]  # So final api response not going to have refresh token
        return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = CSTokenObtainPairSerializer


class CookieTokenRefreshView(TokenRefreshView):
    """ This takes care /token/refresh end point, and needed for httpOnly cookie to be set from Backend """

    throttle_classes = [UserRateThrottle]

    def finalize_response(self, request, response, *args, **kwargs):
        """
        This is called for endpoint /token/refresh | This can only be called after user login successfully and refresh token avl in cookie
        Until refresh token avl in cookie , This returns access token on response, stores refresh token in httpOnly cookie
        """

        if response.data.get("refresh"):
            cookie_max_age = 3600 * 24 * 14  # 14 days
            response.set_cookie(
                "refresh_token",
                response.data["refresh"],
                max_age=cookie_max_age,
                httponly=True,
                samesite="Lax",  # Unless this value is "Lax" chrome won't set cookie from cross origin
                secure=False,
            )
            del response.data["refresh"]
        return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = CookieTokenRefreshSerializer
