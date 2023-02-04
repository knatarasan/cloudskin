from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

import logging

logger = logging.getLogger(__name__)


class CSTokenObtainPairSerializer(TokenObtainPairSerializer):
    """ It's an inherited class to augment JWT payload """

    @classmethod
    def get_token(cls, user):
        """ This class method is overloaded to augment username and email into JWT token payload """
        token = super(CSTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    """ Executed during /token/refresh endpoint needed to set httpOnly from backend """
    refresh = None

    def validate(self, attrs):
        """ when /token/refresh endpoint is called,
        picks the refresh token from httpOnly cookie and returns an access token
        """
        logger.debug(f'context request {self.context["request"].COOKIES}')
        attrs["refresh"] = self.context["request"].COOKIES.get("refresh_token")
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid token found in cookie 'refresh_token'")
