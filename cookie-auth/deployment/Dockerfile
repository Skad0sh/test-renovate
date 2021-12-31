FROM python:3.9-alpine

RUN pip install Flask gunicorn

WORKDIR /app

COPY . .
ENV FLAG=inctfj{Auth3ntic4tion_us1ng_unS1gn3d_C00ki33!}
EXPOSE 5000
CMD gunicorn --bind 0.0.0.0:5000 wsgi:app 