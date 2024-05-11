# Dockerfile
FROM python:3.11 as builder

WORKDIR /app

COPY ./requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

CMD ["python", "manage.py", "makemigrations"]
CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "runserver"]
