DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS injections;
DROP TABLE IF EXISTS medications;

CREATE TYPE acl AS ENUM ('user', 'worker', 'admin');

CREATE TABLE users (
    id BIGINT SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    role acl
);

CREATE TABLE injections (
  id BIGINT SERIAL PRIMARY KEY, 
  user_id: BIGINT,
  date_time: BIGINT,
  location_x: REAL,
  location_y: REAL,
  reaction: BOOLEAN,
  notes: TEXT,
  medication_id: BIGINT,
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	      REFERENCES users(id),
        ON DELETE CASCADE
  CONSTRAINT fk_medication
      FOREIGN KEY(medication_id)) 
	      REFERENCES medications(id)
        ON DELETE CASCADE
);

CREATE TABLE medications (
  id BIGINT SERIAL PRIMARY KEY, 
  user_id: BIGINT,
  added_date_time: BIGINT,
  edited_date_time: BIGINT,
  name: VARCHAR(255),
  dosage: VARCHAR(255),
  is_deleted: BOOLEAN,
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	      REFERENCES users(id),
        ON DELETE CASCADE
);