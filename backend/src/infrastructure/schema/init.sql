DROP DATABASE IF EXISTS postgres;
CREATE DATABASE postgres;

CREATE TABLE users (
    id_user VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (id_user, name, email, password)
VALUES ('5a491c15-7b90-469b-834e-120897d6d0ab', 'test', 'test@test.com', '$2b$10$1l9K24Wo1dDVhfE.CaRxHO1xvMK2SMSYNtoCnlDgXqU8Qfrq6iWbi');
/* password => Administrador1234 */


CREATE TABLE workouts (
    id_workouts SERIAL PRIMARY KEY,
    workout VARCHAR(255) NOT NULL,
    w_weight INT NOT NULL,
    w_reps INT NOT NULL,
    w_sets INT NOT NULL,
    w_date VARCHAR(255) NOT NULL,
    id_user VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);