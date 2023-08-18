-- Insert departments
INSERT INTO Departments (id, Department) VALUES
  (1,'Analytics'),
  (2, 'Sales'),
  (3, 'Engineering'),
  (4, 'Marketing'),
  (5, 'Human Resources'),
  (6, 'Health & Safety'),
  (7, 'Customer Service'),
  (8, 'Production'),
  (9, 'Design'),
  (10, 'Accounting'),
  (11, 'Acquisition');

-- Insert roles
INSERT INTO Roles (id, Job_title, Salary, Department_id) VALUES
  (1, 'CEO', 837000, 11),
  (2, 'Marketing Advisor', 75000, 4),
  (3, 'Lead Software Engineer', 137000, 3),
  (4, 'Product Handler', 23874, 8),
  (5, 'Business Development Agent', 42000, 7),
  (6, 'OH&S Officer', 52000, 6),
  (7, 'Project Lead', 75000, 8),
  (8, 'Data Analyst', 60000, 1),
  (9, 'Sales Associate', 110000, 2),
  (10, 'Charter Accountant', 125000, 10),
  (11, 'HR Representative', 41000, 5),
  (12, 'Front-End Developer', 75000, 9),
  (13, 'Lawyer', 142000, 11),
  (14, 'CFO', 231000, 10);

-- Insert employees
INSERT INTO Employees (id, First_Name, Last_Name, Role_id, Manager_id) VALUES
  (1, 'John', 'JongleheimerSchmidt', 2, NULL),
  (2, 'Joan', 'Rivers', 7, NULL),
  (3, 'Alice', 'Slooooon', 9, 5),
  (4, 'Verica', 'Eureka', 5, NULL),
  (5, 'Cliff', 'McGinty', 1, NULL),
  (6, 'Jeff', 'Elstein', 13, 1),
  (7, 'Barb', 'Longlip', 11, 1),
  (8, 'Margery', 'Simps', 10, 1),
  (9, 'Gregory', 'Bellsabob', 3, 1),
  (10, 'Jackie', 'Twoteeth', 6, 1),
  (11, 'Montgomery', 'Welldone', 7, 2),
  (12, 'Philip J.', 'Fish', 14, 1),
  (13, 'John', 'Zoidbergus', 8, 1),
  (14, 'Turanga', 'Leela', 9, 1),
  (15, 'Reagan', 'Nyght', 4, 7),
  (16, 'Sloan', 'Kripe', 4, 7),
  (17, 'Alexander', 'Schmidt', 4, 7);
