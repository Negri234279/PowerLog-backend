CREATE TABLE users (
  id_user UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE workouts (
  id_workouts SERIAL PRIMARY KEY,
  workout VARCHAR(255) NOT NULL,
  w_weight INT NOT NULL,
  w_reps INT NOT NULL,
  w_sets INT NOT NULL,
  w_date VARCHAR(255) NOT NULL,
  id_user UUID NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id_user)
);
DROP TABLE workouts;
DROP TABLE users;