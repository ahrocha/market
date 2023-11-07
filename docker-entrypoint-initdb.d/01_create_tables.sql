CREATE TABLE types (
    id serial PRIMARY KEY,
    type VARCHAR(32),
    tax NUMERIC(5, 4) CHECK (tax >= 0 AND tax <= 1)
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC(10, 2),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES types(id)
);

CREATE TABLE checkouts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    city VARCHAR(255),
    address VARCHAR(255),
    zip VARCHAR(20),
    state VARCHAR(255),
    country VARCHAR(255),
    created TIMESTAMPTZ DEFAULT NOW(),
    total_price NUMERIC(10, 2),
    extra_info JSONB
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    token VARCHAR(255),
    validity TIMESTAMPTZ
);


INSERT INTO public.users (email,"password") VALUES
	 ('admin2@admin.com','$2y$10$m9ov66iNbNgQul7Sy3fJEurjcbr9NCQzkLZauTVaLGrrMTMoKR9om');


INSERT INTO public."types" ("name",tax) VALUES
	 ('drink',0.5000),
	 ('food',0.0500);


INSERT INTO public.products ("name",price,type_id) VALUES
	 ('orange juice',17.00,1),
	 ('pizza',44.00,2),
	 ('rice',9.00,2),
	 ('water',4.00,1);


INSERT INTO public.checkouts ("name",email,phone,city,address,zip,state,country,created,total_price,extra_info) VALUES
	 ('John Doe','buyer@domain.com','11999999999','São Paulo','Avenida Paulista','04112000','São Paulo','Brazil','2023-11-06 21:26:49-03',74.00,'[{"id": 1, "name": "orange juice", "price": "17.00", "type_id": 1, "quantity": 1}, {"id": 2, "name": "pizza", "price": "44.00", "type_id": 2, "quantity": 1}, {"id": 3, "name": "rice", "price": "9.00", "type_id": 2, "quantity": 1}, {"id": 4, "name": "water", "price": "4.00", "type_id": 1, "quantity": 1}]');

