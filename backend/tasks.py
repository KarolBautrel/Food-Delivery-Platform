from celery import Celery
from time import sleep

app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
    include=["tasks"],
)


@app.task
def add(x, y):
    sleep(5)
    return x + y
