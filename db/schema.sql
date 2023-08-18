DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;
USE management_db;


CREATE TABLE Departments (
  id INT auto_increment NOT NULL PRIMARY KEY,
  Department VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Role (
  id INT auto_increment NOT NULL PRIMARY KEY,
  Job_Title VARCHAR(30) NOT NULL,
  Salary DECIMAL NOT NULL,
  Department_id INT NOT NULL
  FOREIGN KEY (Department_id)
  REFERENCES Department(id)
  ON DELETE SET NULL
);

CREATE TABLE Employee (
  id INT,
  First_Name VARCHAR(30) NOT NULL,
  Last_name INT,
  Role_id
  Manager_id TEXT,
  FOREIGN KEY (instructor_id)
  REFERENCES instructors(id)
  ON DELETE SET NULL
);