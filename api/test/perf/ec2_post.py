

import time
from locust import HttpUser, task, between
import random

# This works
#  locust --host=http://localhost:8000 --locustfile ec2_post.py

class QuickstartUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def hello_world(self):
        self.client.get("/ec2/")

    @task
    def create_items(self):
        rand = str(random.random())
        self.client.post("/ec2/", json={"plan": 2})
