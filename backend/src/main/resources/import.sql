INSERT INTO usuario (usuario_id, nombre, apellido, email, password, role) VALUES (1, 'Dani', 'Olmedo', 'dani@unpaz.edu.ar', '$2a$12$0N/7Qv4NStrZ1E1J5pwtsuOaOLy9ja3HwTVLA3G5DUKaLd1zLh0n2', 'CLIENTE');
INSERT INTO usuario (usuario_id, nombre, apellido, email, password, role) VALUES (2, 'Admin', 'UNPAZ', 'admin@unpaz.edu.ar', '$2a$12$TJAzeu4fACStsVlvs47Vc.urUlGJ2NGXyHJ8ObGU.JWjIw3G2ONYO', 'ADMIN');
INSERT INTO usuario (usuario_id, nombre, apellido, email, password, role) VALUES (3, 'Lucia', 'Soto', 'lucia@test.com', '$2a$12$0N/7Qv4NStrZ1E1J5pwtsuOaOLy9ja3HwTVLA3G5DUKaLd1zLh0n2', 'CLIENTE');
INSERT INTO cliente (usuario_id) VALUES (1);
INSERT INTO "admin" (usuario_id) VALUES (2);
INSERT INTO cliente (usuario_id) VALUES (3);
INSERT INTO locacion (id_locacion, nombre, direccion, capacidad, asientos) VALUES (1, 'Centro Cultural UNPAZ', 'Alem 700', 200, 'Estándar');
INSERT INTO sector (sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (1, 'VIP', 100, 100, 1);
INSERT INTO evento (evento_id, titulo, tipo, descripcion, admin_id, locacion_evento_id) VALUES (1, 'Charla Tech', 'Conferencia', 'Java y Spring Boot', 2, 1);

-- 
INSERT INTO locacion (id_locacion, nombre, direccion, capacidad, asientos) VALUES (2, 'Teatro Avenida', 'Av Siempre Viva', 150, 'Estandar, VIP');
INSERT INTO sector(sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (2, 'VIP', 50, 50, 2);
INSERT INTO sector(sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (3, 'Estandar', 100, 100, 2);
INSERT INTO evento (evento_id, titulo, tipo, descripcion, admin_id, locacion_evento_id) VALUES (2, 'Nikolai Kugansky', 'Concierto', 'Rachmaninoff Piano Concertos', 2, 2);
