import logging
import os

import rsa
from django.conf import settings
from django.db import models

logger = logging.getLogger(__name__)


class RSA:
    def __init__(self):
        # generate public and private keys with
        # rsa.newkeys method,this method accepts
        # key length as its parameter
        # key length should be atleast 16

        self.public_key_file = settings.RSA_PUBLIC_KEY
        self.private_key_file = settings.RSA_PRIVATE_KEY
        #         self.publicKey = """-----BEGIN RSA PUBLIC KEY-----
        # MEgCQQC/+a69S5oIDU5Qy+d891gc6qH06W3huEAW1yxlfRrZUxp0awlXe7SPWjgJ
        # g8u8p0l80pzsLcGzpudnYHcZAk3hAgMBAAE=
        # -----END RSA PUBLIC KEY-----"""
        #         self.privateKey = """-----BEGIN RSA PRIVATE KEY-----
        # MIIBPQIBAAJBAL/5rr1LmggNTlDL53z3WBzqofTpbeG4QBbXLGV9GtlTGnRrCVd7
        # tI9aOAmDy7ynSXzSnOwtwbOm52dgdxkCTeECAwEAAQJBALrMn4U+PUE8gUoJPtTQ
        # cQKiJLmFMhCDEomnEmImmsWiNIIgJ8kcRpeDtqhA92uFclu+3e0zsraWfdvncb4R
        # VAkCIwDsPJcAeiGFHCU65GyEcG2m/J84Uya920uqXTYR30/RLjxTAh8A0AkpF7oX
        # qhghm5H/S3esSC8ud9gA0hO53CVW7SZ7AiI0oZce0xbuugONaGDI7OdxIa0zdksW
        # V2o3LYcjWjZFK2DjAh8Agy6jmPCh54Jb/uurXn1SSBpoZO3yZoZF1wo8rEJtAiIs
        # vkhJph5IPC3bq0KI5E7jxjv4CINwKhQ6nmYfA0lvz/pP
        # -----END RSA PRIVATE KEY-----"""
        self.publicKey, self.privateKey = rsa.newkeys(512)

        logger.debug(f"publicKey:                {self.publicKey}")
        logger.debug(f"privateKey:               {self.privateKey}")

    # def prep_keys(self):
    #     if not os.path.exists(self.public_key_file) and not os.path.exists(self.private_key_file):
    #         self.publicKey, self.privateKey = rsa.newkeys(512)
    #         with open(self.public_key_file, "w+") as f:
    #             f.write(self.publicKey.save_pkcs1().decode())
    #         with open(self.private_key_file, "w+") as f:
    #             f.write(self.privateKey.save_pkcs1().decode())
    #     else:
    #         with open(self.public_key_file, "r") as f:
    #             self.publicKey = rsa.PublicKey.load_pkcs1(f.read().encode())

    #         with open(self.private_key_file, "r") as f:
    #             self.privateKey = rsa.PrivateKey.load_pkcs1(f.read().encode())

    def encrypt(self, accessKeys):
        # rsa.encrypt method is used to encrypt
        # string with public key string should be
        # encode to byte string before encryption
        # with encode method

        if accessKeys is not None:
            return rsa.encrypt(accessKeys.encode(), self.publicKey)
        return "".encode()

    def decrypt(self, encMessage: bytes):
        # the encrypted message can be decrypted
        # with ras.decrypt method and private key
        # decrypt method returns encoded byte string,
        # use decode method to convert it to string
        # public key cannot be used for decryption
        decMessage = rsa.decrypt(encMessage, self.privateKey)
        return decMessage


class AwsCreds(models.Model):
    owner = models.ForeignKey("auth.User", related_name="aws_creds", on_delete=models.CASCADE)
    aws_iam_user = models.TextField(null=True)
    aws_access_key = models.TextField(null=True)  # TODO to be removed
    aws_access_secret = models.TextField(null=True)  # TODO to be removed
    aws_private_key_pair_pem_name = models.TextField(null=True)
    aws_private_key_pair_pem = models.TextField(null=True)  # TODO to be removed
    aws_access_key_en = models.BinaryField(null=True)
    aws_access_secret_en = models.BinaryField(null=True)
    aws_private_key_pair_pem_en = models.BinaryField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # TODO to implement encrypt and decrypt aws_access_key and aws_access_secert
    def save(self, *args, **kwargs):
        rsa = RSA()
        logger.debug(f"while Saving:  {self}")
        self.aws_access_key_en = rsa.encrypt(self.aws_access_key)
        self.aws_access_secret_en = rsa.encrypt(self.aws_access_secret)
        self.aws_private_key_pair_pem_en = rsa.encrypt(self.aws_private_key_pair_pem)

        # Following is workaround as these fields cannot be converted to read_only_fields
        self.aws_access_key = None
        self.aws_access_secret = None
        self.aws_private_key_pair_pem = None

        super().save(*args, **kwargs)

    # get doesn't override the get method of the model

    def get(self, *args, **kwargs):
        rsa = RSA()
        self.aws_access_key = rsa.decrypt(self.aws_access_key_en)
        self.aws_access_secret = rsa.decrypt(self.aws_access_secret_en)
        self.aws_private_key_pair_pem = rsa.decrypt(self.aws_private_key_pair_pem_en)
        logger.debug(f"after decrypted :  {self}")
        super(AwsCreds, self).get(*args, **kwargs)

    def __str__(self):
        return (
            f"owner: {self.owner} iam {self.aws_iam_user} access_key {self.aws_access_key} access_secret {self.aws_access_secret}"
        )
