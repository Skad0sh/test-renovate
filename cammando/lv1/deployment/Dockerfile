FROM python:3.9-slim

RUN pip install Flask
RUN apt-get update
RUN apt install figlet
WORKDIR /app

COPY ./app/ .
COPY .flag.txt .
EXPOSE 5000
CMD [ "python" ,"app.py" ]
