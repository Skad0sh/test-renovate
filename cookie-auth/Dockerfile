FROM python:3.9-alpine

RUN pip install Flask

WORKDIR /app

COPY . .
EXPOSE 5000
CMD [ "python" ,"app.py" ]