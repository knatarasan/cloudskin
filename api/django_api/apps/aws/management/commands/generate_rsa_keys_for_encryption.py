import logging

import rsa
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generate new rsa key for encryption"

    def handle(self, *args, **options):
        # Get the latest data from AWS

        """
        public_key_file: path to public key file
        private_key_file: path to private key file
        """
        public_key_file = settings.PUBLIC_KEY_FILE
        private_key_file = settings.PRIVATE_KEY_FILE
        logger.debug("public_key_file: %s", public_key_file)
        logger.debug("private_key_file: %s", private_key_file)

        # Generate key pair
        (public_key, private_key) = rsa.newkeys(1024)
        # Save public key to string
        public_key_str = public_key.save_pkcs1().decode("utf-8")
        # Save private key to string
        private_key_str = private_key.save_pkcs1().decode("utf-8")
        # Write public key to file
        with open(public_key_file, "w", encoding="utf-8") as f:
            f.write(public_key_str)

        # Write private key to file
        with open(private_key_file, "w", encoding="utf-8") as f:
            f.write(private_key_str)
