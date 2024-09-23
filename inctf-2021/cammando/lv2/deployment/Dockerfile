FROM python:3.12-slim

RUN pip install Flask
RUN apt-get update
RUN apt install figlet
WORKDIR /app

COPY ./app/ .
COPY flag.txt .
RUN chmod 0444 flag.txt
RUN useradd appuser && chown -R appuser /app
USER appuser

EXPOSE 5000
CMD [ "python" ,"app.py" ]