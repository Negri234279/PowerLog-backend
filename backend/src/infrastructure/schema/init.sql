CREATE TABLE users (
    id_user VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (id_user, name, email, password)
VALUES ('0f476be6-b0cf-4984-90e7-ad2d7041cf0e', 'test', 'test@test.com', '$2b$10$1l9K24Wo1dDVhfE.CaRxHO1xvMK2SMSYNtoCnlDgXqU8Qfrq6iWbi');
/* password => Administrador1234 */


CREATE TABLE workouts (
    id_workouts VARCHAR(255) PRIMARY KEY,
    workout VARCHAR(255) NOT NULL,
    w_weight INT NOT NULL,
    w_reps INT NOT NULL,
    w_sets INT NOT NULL,
    w_date DATE NOT NULL,
    id_user VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

INSERT INTO workouts (id_workouts, workout, w_weight, w_reps, w_sets, w_date, id_user)
VALUES ('0f476be6-b0cf-4984-90e7-ad2d7041cf0a', 'SQHG', 110, 4, 4, '01/01/2022', '0f476be6-b0cf-4984-90e7-ad2d7041cf0e');

INSERT INTO workouts (id_workouts, workout, w_weight, w_reps, w_sets, w_date, id_user)
VALUES ('0f476be6-b0cf-4984-90e7-ad2d7041cf0b', 'BP', 50, 6, 4, '01/01/2022', '0f476be6-b0cf-4984-90e7-ad2d7041cf0e');

INSERT INTO workouts (id_workouts, workout, w_weight, w_reps, w_sets, w_date, id_user)
VALUES ('45e16863-0ec8-41ba-9118-f987ebb0c9cb', 'DL', 110, 5, 5, '01/01/2022', '0f476be6-b0cf-4984-90e7-ad2d7041cf0e');