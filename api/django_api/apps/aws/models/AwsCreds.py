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

        self.publicKey, self.privateKey = rsa.newkeys(512)
        public_key_file = settings.RSA_PUBLIC_KEY
        private_key_file = settings.RSA_PRIVATE_KEY

        if not os.path.exists(public_key_file):
            with open(public_key_file, "w+") as f:
                f.write(self.publicKey.save_pkcs1().decode())
        else:
            with open(public_key_file, "r") as f:
                self.publicKey = rsa.PublicKey.load_pkcs1(f.read().encode())

        if not os.path.exists(private_key_file):
            with open(private_key_file, "w+") as f:
                f.write(self.privateKey.save_pkcs1().decode())
            os.chmod(private_key_file, 400)

        else:
            with open(private_key_file, "r") as f:
                self.privateKey = rsa.PrivateKey.load_pkcs1(f.read().encode())

    def encrypt(self, accessKeys):
        # rsa.encrypt method is used to encrypt
        # string with public key string should be
        # encode to byte string before encryption
        # with encode method
        encMessage = rsa.encrypt(accessKeys.encode(), self.publicKey)

        return encMessage

    def decrypt(self, encMessage: str):
        # the encrypted message can be decrypted
        # with ras.decrypt method and private key
        # decrypt method returns encoded byte string,
        # use decode method to convert it to string
        # public key cannot be used for decryption
        encMessageBytes: bytes = bytes(encMessage, "utf-8")
        decMessage = rsa.decrypt(encMessageBytes, self.privateKey).decode()
        return decMessage


class AwsCreds(models.Model):
    owner = models.ForeignKey("auth.User", related_name="aws_creds", on_delete=models.CASCADE)
    aws_iam_user = models.TextField(null=True)
    aws_access_key = models.TextField(null=True)
    aws_access_secret = models.TextField(null=True)
    aws_private_key_pair_pem_name = models.TextField(null=True)
    aws_private_key_pair_pem = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # TODO to implement encrypt and decrypt aws_access_key and aws_access_secert
    # def save(self, *args, **kwargs):
    #     rsa = RSA()
    #     logger.debug(f'while Saving:  {self}')
    #     self.aws_access_key = rsa.encrypt(self.aws_access_key)
    #     self.aws_access_secret = rsa.encrypt(self.aws_access_secret)
    #     self.aws_private_key_pair_pem = rsa.encrypt(self.aws_private_key_pair_pem)
    #     super().save(*args, **kwargs)

    # get doesn't override the get method of the model

    # def get(self, *args, **kwargs):
    #     rsa = RSA()
    #     self.aws_access_key = rsa.decrypt(self.aws_access_key)
    #     self.aws_access_secret = rsa.decrypt(self.aws_access_secret)
    #     self.aws_private_key_pair_pem = rsa.decrypt(self.aws_private_key_pair_pem)
    #     logger.debug(f'after decrypted :  {self}')
    #     super(AwsCreds, self).get(*args, **kwargs)
    #
    # def __str__(self):
    #     return f'owner: {self.owner} iam {self.aws_iam_user} access_key {self.aws_access_key} access_secret {self.aws_access_secret}'
