# locust --host=http://localhost:30487 --locustfile ec2_get.py

from locust import HttpUser, between, task
class ApiUser(HttpUser):
    wait_time = between(2, 5)
    def on_start(self):
        pass

    @task(5)
    def get_todo_list(self):
        self.client.get('/ec2/')

    def on_stop(self):
        pass