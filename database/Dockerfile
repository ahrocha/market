# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Expose the default PostgreSQL port
EXPOSE 5432

# Copy your custom PostgreSQL configuration (optional)
# COPY ./path/to/your/postgresql.conf /etc/postgresql/postgresql.conf

# copy /docker-entrypoint-initdb.d to container
COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# Start the PostgreSQL service
CMD ["postgres"]
