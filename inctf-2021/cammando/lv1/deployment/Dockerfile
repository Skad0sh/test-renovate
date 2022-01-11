FROM python:3.9-slim

RUN pip install Flask gunicorn
RUN apt-get update
RUN apt install figlet
WORKDIR /app

COPY ./app/ .
COPY .f14g_a1c426w1g.txt .
RUN chmod 0444 .f14g_a1c426w1g.txt
RUN useradd appuser && chown -R appuser /app
USER appuser
EXPOSE 5000
CMD gunicorn -w 2 --threads 2 --bind 0.0.0.0:5000 wsgi:app
