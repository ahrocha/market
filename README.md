# running

1) clone the project

2) Customize the .env based on the sample:
cp .env.sample .env

3) execute docker compose:
docker compose up --build 
OR
docker-compose up --build

4) Login to admin is admin@admin.com / 12345


# My notes

1) Optimize one instance DB connection
2) Do more methods (PUT/PATCH)
3) make responsible

Local:
backend

php -S localhost:8080 public/index.php

database
docker run -d -p 5432:5432 --name my-postgresql-container my-postgresql
docker start my-postgresql-container

frontend
npm start
