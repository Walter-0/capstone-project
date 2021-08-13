# syntax=docker/dockerfile:1

FROM python:3.9-slim

WORKDIR /app

COPY ./src /app/src

COPY ./requirements.txt /app


RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host=0.0.0.0", "--reload"]
