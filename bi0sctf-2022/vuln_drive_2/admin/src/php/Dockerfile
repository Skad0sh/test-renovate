FROM php:8.3-apache
COPY src/ /var/www/html/
RUN mkdir /var/www/html/uploads
RUN chown www-data:www-data /var/www/html/uploads
COPY .htaccess /var/www/html/uploads/
