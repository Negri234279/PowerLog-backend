set datestyle to 'ISO, DMY';

CREATE TABLE users (
    id_user VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


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
