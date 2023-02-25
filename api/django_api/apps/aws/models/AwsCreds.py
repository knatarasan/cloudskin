import logging
import os

import rsa
from django.conf import settings
from django.db import models

logger = logging.getLogger(__name__)


class RSA_Key_Generator:
    @classmethod
    def generate_keys(cls, public_key_file, private_key_file):
        """
        public_key_file: path to public key file
        private_key_file: path to private key file
        """

        print("public_key_file", public_key_file)
        print("private_key_file", private_key_file)
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


class RSA:
    def __init__(self):
        self.publicKey, self.privateKey = self.retrieve_keys(os.getcwd() + "/public_key.pem", os.getcwd() + "/private_key.pem")

    # def encrypt(self, accessKeys, publicKey):
    def encrypt(self, accessKeys):
        """
        Receive string encrypt it with public key and return encrypted string
        """

        if accessKeys is not None:
            return rsa.encrypt(accessKeys.encode(), self.publicKey)
        return "".encode()

    def decrypt(self, encMessage: bytes):
        """
        Receive encrypted string decrypt it with private key and return decrypted string
        """
        if encMessage:
            decMessage = rsa.decrypt(encMessage, self.privateKey)
            return decMessage.decode()
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
    aws_access_key = models.BinaryField(null=True)  # TODO to be removed
    aws_access_secret = models.BinaryField(null=True)  # TODO to be removed
    aws_private_key_pair_pem_name = models.TextField(null=True)
    aws_private_key_pair_pem = models.BinaryField(null=True)  # TODO to be removed
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # TODO to implement encrypt and decrypt aws_access_key and aws_access_secert
    def save(self, *args, **kwargs):
        rsa_obj = RSA()
        logger.debug(f"while Saving:  {self}")
        self.aws_access_key = rsa_obj.encrypt(self.aws_access_key)
        self.aws_access_secret = rsa_obj.encrypt(self.aws_access_secret)
        self.aws_private_key_pair_pem = rsa_obj.encrypt(self.aws_private_key_pair_pem)

        super().save(*args, **kwargs)

    # def get_decrypted(self, pk):
    #     """
    #     Retrieves a single instance with decrypted fields based on the given primary key.
    #     """
    #     instance = self.objects.get(pk=pk)
    #     rsa = RSA()
    #     instance.aws_access_key = rsa.decrypt(instance.aws_access_key_en)
    #     instance.aws_access_secret = rsa.decrypt(instance.aws_access_secret_en)
    #     instance.aws_private_key_pair_pem = rsa.decrypt(instance.aws_private_key_pair_pem_en)
    #     return instance

    # get doesn't override the get method of the model

    # def get(self, *args, **kwargs):
    #     rsa = RSA()
    #     self.aws_access_key = rsa.decrypt(self.aws_access_key_en)
    #     self.aws_access_secret = rsa.decrypt(self.aws_access_secret_en)
    #     self.aws_private_key_pair_pem = rsa.decrypt(self.aws_private_key_pair_pem_en)
    #     logger.debug(f"after decrypted :  {self}")
    #     super(AwsCreds, self).get(*args, **kwargs)

    def __str__(self):
        return (
            f"owner: {self.owner} iam {self.aws_iam_user} access_key {self.aws_access_key} access_secret {self.aws_access_secret}"
        )
