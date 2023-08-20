
INSERT INTO Departments (Department) VALUES
  ( 'Analytics'),
  ( 'Sales'),
  ( 'Engineering'),
  ( 'Human Resources'),
  ( 'Health & Safety'),
  ( 'Customer Service'),
  ( 'Production'),
  ( 'Design'),
  ( 'Accounting'),
  ( 'Acquisition');


INSERT INTO roles ( Title, Salary, Department_id) VALUES
  ( 'CEO', 837000, 11),
  ( 'Marketing Advisor', 75000, 4),
  ( 'Lead Software Engineer', 137000, 3),
  ( 'Product Handler', 23874, 8),
  ( 'Business Development Agent', 42000, 7),
  ( 'OH&S Officer', 52000, 6),
  ( 'Project Lead', 75000, 8),
  ( 'Data Analyst', 60000, 1),
  ( 'Sales Associate', 110000, 2),
  ( 'Charter Accountant', 125000, 10),
  ( 'HR Representative', 41000, 5),
  ( 'Front-End Developer', 75000, 9),
  ( 'Lawyer', 142000, 11),
  ( 'CFO', 231000, 10);


INSERT INTO Employees (First_Name, Last_Name, Role_id, Manager_id) VALUES
  ('John', 'JongleheimerSchmidt', 1, 1),
  ('Joan', 'Rivers', 2, 2),
  ('Alice', 'Slooooon', 3, 5),
  ('Verica', 'Eureka', 4, NULL),
  ('Cliff', 'McGinty', 5, NULL),
  ('Jeff', 'Elstein', 6, 1),
  ('Barb', 'Longlip', 7, 1),
  ('Margery', 'Simps', 8, 1),
  ('Gregory', 'Bellsabob', 9, 1),
  ('Jackie', 'Twoteeth', 10, 1),
  ('Montgomery', 'Welldone', 11, 2),
  ('Philip J.', 'Fish', 12, 1),
  ('John', 'Zoidbergus', 13, 1),
  ('Turanga', 'Leela', 14, 1),
  ('Reagan', 'Nyght', 4, 7),
  ('Sloan', 'Kripe', 14, 7),
  ('Alexander', 'Schmidt', 4, 7);

