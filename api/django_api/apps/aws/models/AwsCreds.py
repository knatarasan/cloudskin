import logging
import os

import rsa
from django.conf import settings
from django.db import models

logger = logging.getLogger(__name__)


# class RSA_Key_Generator:
#     @classmethod
#     def generate_keys(cls, public_key_file, private_key_file):
#         """
#         public_key_file: path to public key file
#         private_key_file: path to private key file
#         """

#         print("public_key_file", public_key_file)
#         print("private_key_file", private_key_file)
#         # Generate key pair
#         (public_key, private_key) = rsa.newkeys(1024)
#         # Save public key to string
#         public_key_str = public_key.save_pkcs1().decode("utf-8")
#         # Save private key to string
#         private_key_str = private_key.save_pkcs1().decode("utf-8")
#         # Write public key to file
#         with open(public_key_file, "w", encoding="utf-8") as f:
#             f.write(public_key_str)

#         # Write private key to file
#         with open(private_key_file, "w", encoding="utf-8") as f:
#             f.write(private_key_str)


class RSA:
    def __init__(self):
        self.publicKey, self.privateKey = self.retrieve_keys(settings.PUBLIC_KEY_FILE, settings.PRIVATE_KEY_FILE)

    def encrypt(self, secret: str):
        """
        Receive string encrypt it with public key and return encrypted string
        """

        if secret is not None:
            return rsa.encrypt(secret.encode(), self.publicKey)
        return "".encode()

    def decrypt(self, encryptedSecret: bytes):
        """
        Receive encrypted string decrypt it with private key and return decrypted string
        """
        if encryptedSecret:
            try:
                decMessage = rsa.decrypt(encryptedSecret, self.privateKey)
                return decMessage.decode()
            except Exception as e:
                logger.error("Check whether you use right key for decryption", e)
                return ""

        logger.error("encryptedSecret is null")
        return ""

    def retrieve_keys(self, public_key_file, private_key_file):
        # Read public key from file
        with open(public_key_file, "r", encoding="utf-8") as f:
            public_key_str = f.read()

        # Read private key from file
        with open(private_key_file, "r", encoding="utf-8") as f:
            private_key_str = f.read()

        # Load public key from string
        public_key = rsa.PublicKey.load_pkcs1(public_key_str.encode("utf-8"))

        # Load private key from string
        private_key = rsa.PrivateKey.load_pkcs1(private_key_str.encode("utf-8"))

        return (public_key, private_key)


class AwsCreds(models.Model):
    owner = models.ForeignKey("auth.User", related_name="aws_creds", on_delete=models.CASCADE)
    aws_iam_user = models.TextField(null=True)
    aws_access_key_en = models.BinaryField(null=True)  # TODO to be removed
    aws_access_secret_en = models.BinaryField(null=True)  # TODO to be removed
    aws_private_key_pair_pem_name = models.TextField(null=True)
    aws_private_key_pair_pem_en = models.BinaryField(null=True)  # TODO to be removed
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # TODO to implement encrypt and decrypt aws_access_key and aws_access_secert
    def save(self, *args, **kwargs):
        rsa_obj = RSA()
        logger.debug(f"while Saving:  {self}")
        self.aws_access_key_en = rsa_obj.encrypt(self.aws_access_key_en)
        self.aws_access_secret_en = rsa_obj.encrypt(self.aws_access_secret_en)
        self.aws_private_key_pair_pem_en = rsa_obj.encrypt(self.aws_private_key_pair_pem_en)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"owner: {self.owner} iam {self.aws_iam_user}"
