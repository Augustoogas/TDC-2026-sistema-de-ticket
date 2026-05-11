-- 1. Usuarios (IMPORTANTE: La columna suele ser 'password' y 'role')
-- Usuario Cliente
INSERT INTO usuario (nombre, email, password, role) VALUES ('Dani Olmedo', 'dani@unpaz.edu.ar', '1234', 'CLIENTE');
INSERT INTO cliente (usuario_id) VALUES (1);

-- Usuario Admin
INSERT INTO usuario (nombre, email, password, role) VALUES ('Admin UNPAZ', 'admin@unpaz.edu.ar', 'admin123', 'ADMIN');
INSERT INTO admin (usuario_id) VALUES (2);

-- Usuario para pruebas de reserva
INSERT INTO usuario (nombre, email, password, role) VALUES ('Lucia Soto', 'lucia@test.com', '1234', 'CLIENTE');
INSERT INTO cliente (usuario_id) VALUES (3);

-- 2. Locación, Sectores y Eventos
INSERT INTO locacion (nombre, direccion, capacidad, asientos) VALUES ('Centro Cultural UNPAZ', 'Alem 700', 200, 'Fila 1-20');
INSERT INTO locacion (nombre, direccion, capacidad, asientos) VALUES ('Microestadio UNPAZ', 'José C. Paz', 500, 'General');

INSERT INTO sector (sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (1, 'VIP', 100, 100, 2);
INSERT INTO sector (sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (2, 'Campo', 400, 400, 2);

-- Eventos (Vinculados a los IDs de admin y locacion creados arriba)
INSERT INTO evento (titulo, tipo, descripcion, admin_id, locacion_evento_id) VALUES ('Charla Tech', 'Conferencia', 'Java y Spring Boot', 2, 1);
INSERT INTO evento (titulo, tipo, descripcion, admin_id, locacion_evento_id) VALUES ('Coldplay', 'Concierto', 'Prueba RF12', 2, 2);

