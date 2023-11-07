backend

php -S localhost:8080 public/index.php

database
docker run -d -p 5432:5432 --name my-postgresql-container my-postgresql
docker start my-postgresql-container

frontend
npm start
