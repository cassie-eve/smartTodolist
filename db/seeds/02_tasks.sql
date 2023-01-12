-- command to run against midterm DB
--    \i db/seeds/02_tasks.sql

INSERT INTO tasks (name, category, due_date, completed, priority, users_id) VALUES
('Harry Potter', 'To Read', '2023/01/14', 'true', 3, 1),
('Tacofino', 'To Eat', '2023/02/17', 'false', 3, 2),
('Avatar', 'To Watch', '2023/01/21', 'false', 2, 3),
('Dish soap', 'To Buy', '2023/01/06', 'true', 1, 4),
('Sapiens', 'To Read', '2023/01/14', 'true', 3, 1),
('Noma', 'To Eat', '2023/02/17', 'false', 3, 2),
('White Lotus', 'To Watch', '2023/01/21', 'false', 2, 3),
('Duvet cover', 'To Buy', '2023/01/06', 'true', 1, 4),
('Bon Appetit Magazine', 'To Read', '2023/01/14', 'true', 3, 1),
('Matzo ball soup', 'To Eat', '2023/02/17', 'false', 3, 2),
('Golden Globes Awards Show', 'To Watch', '2023/01/21', 'false', 2, 3),
('Toothpaste', 'To Buy', '2023/01/06', 'true', 1, 4);
