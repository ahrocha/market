# Use an official PHP image as the base image with the desired PHP version
FROM php:8.1

# Install system dependencies and the PostgreSQL driver for PDO
RUN apt-get update && apt-get install -y libpq-dev
RUN docker-php-ext-install pdo pdo_pgsql

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy your PHP application code into the container
COPY . /var/www/html

# Expose the port that your PHP application is listening on
EXPOSE 80

# Command to start your PHP application
CMD ["php", "-S", "0.0.0.0:80", "public/index.php"]
