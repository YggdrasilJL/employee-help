DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;
USE management_db;

drop table if exists employee;
drop table if exists department;
drop table if exists role;
drop table if exists budget;

CREATE TABLE Departments (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Department VARCHAR(50) NOT NULL
);

CREATE TABLE Roles (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Job_Title VARCHAR(30) NOT NULL,
  Salary DECIMAL(10, 2) NOT NULL,
  Department_id INT NOT NULL,
  FOREIGN KEY (Department_id) REFERENCES Departments(id) ON DELETE SET NULL
);

CREATE TABLE Employees (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  First_Name VARCHAR(30) NOT NULL,
  Last_Name VARCHAR(30) NOT NULL,
  Role_id INT,
  Manager_id INT,
  FOREIGN KEY (Role_id) REFERENCES Roles(id) ON DELETE SET NULL,
  FOREIGN KEY (Manager_id) REFERENCES Employees(id) ON DELETE SET NULL
);