
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

import logging


logger = logging.getLogger(__name__)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'user': reverse('user-list', request=request, format=format),
        'token': reverse('jwt_token_obtain_pair', request=request, format=format),
        'refresh': reverse('jwt_token_refresh', request=request, format=format),
        'plan': reverse('plan-list', request=request, format=format),
        'ec2': reverse('ec2-list', request=request, format=format),
        'installed_service': reverse('installed-service-list', request=request, format=format),
        'installable_service': reverse('installable-service-list', request=request, format=format),
        'aws_creds': reverse('aws-creds-list', request=request, format=format)
    })




