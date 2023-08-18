INSERT INTO Departments (Department)
VALUES 

1('Analytics'),
2('Sales'),
3('Engineering'),
4('Marketing'),
5('Human Resources'),
6('Health & Safety'),
7('Customer Service'),
8('Production'),
9('Design'),
10('Accounting'),
11('Aquistion'),

INSERT INTO Roles (Title, Salary, Department_id)
VALUES 

1('CEO', 837000, 11),
2('Marketing Advisor', 75000, 4),
3('Lead Software Engineer', 137000, 3),
4('Product Handler', 23874, 8),
5('Business Development Agent', 42000, 7),
6('OH&S Officer', 52000, 6),
7('Project Lead', 75000, 8),
8('Data Analyst', 60000, 1),
9('Sales Associate', 110000, 2),
10('Charter Accountant', 125000, 10),
11('HR Representative', 41000, 5),
12('Front-End Developer', 75000, 9),
13('Lawyer', 142000, 11),
14('CFO', 231000, 10),

INSERT INTO Employees (First_Name, Last_Name, Role_id, Manager_id)
VALUES 

('John','JongleheimerSchimdt', 2, NULL),
('Joan','Rivers', 7, NULL),
('Alice','Slooooon', 9, 5),
('Verica','Eureka', 5, NULL),
('Cliff','McGinty', 1, NULL),
('Jeff','Elstein', 13, 1),
('Barb','Longlip', 11, 1),
('Margery','Simps', 10, 1),
('Gregory','Bellsabob', 3, 1),
('Jackie','Twoteeth', 6, 1),
('Montgomery','Welldone', 7, 2),
('Philip J.','Fish', 14, 1),
('John','Zoidbergus', 8, 1),
('Turanga','Lela', 9, 1),
('Reagan','Nyght', 4, 7),
('Sloan','Kripe', 4, 7),
('Alexander','Schimdt', 4, 7),

