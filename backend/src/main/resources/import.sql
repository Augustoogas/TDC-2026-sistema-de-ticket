-- 1. Usuarios (Cliente y Admin)
INSERT INTO usuario (nombre, email, contrasenia) VALUES ('Dani Olmedo', 'dani@unpaz.edu.ar', '1234');
INSERT INTO cliente (usuario_id) VALUES (1);

INSERT INTO usuario (nombre, email, contrasenia) VALUES ('Admin UNPAZ', 'admin@unpaz.edu.ar', 'admin123');
INSERT INTO admin (usuario_id) VALUES (2);

-- 2. Locación y Evento
INSERT INTO locacion (nombre, direccion, capacidad, asientos) VALUES ('Centro Cultural UNPAZ', 'Alem 700', 200, 'Fila 1-20');
-- Asegurate que los nombres de las columnas coincidan con tus clases (admin_id y locacion_evento_id)
INSERT INTO evento (titulo, tipo, descripcion, admin_id, locacion_evento_id) VALUES ('Charla Tech', 'Conferencia', 'Java y Spring Boot', 2, 1);

-- 3. Una Reserva previa (Estado PAGADA para poder emitir ticket)
INSERT INTO reserva (cliente_id, evento_id, monto_total, estado, fecha_creacion) 
VALUES (1, 1, 5000.0, 'PAGADA', CURRENT_TIMESTAMP);


-- para poder probar la reserva (req 12)
INSERT INTO usuario (nombre, email, contrasenia) VALUES ('Lucia Soto', 'lucia@test.com', '1234');
INSERT INTO cliente (usuario_id) VALUES (3);

INSERT INTO locacion (nombre, direccion, capacidad) VALUES ('Microestadio UNPAZ', 'José C. Paz', 500);

INSERT INTO sector (sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (1, 'VIP', 100, 100, 1);
INSERT INTO sector (sector_id, nombre, capacidad, disponibles, locacion_id) VALUES (2, 'Campo', 400, 400, 1);
-- En vez de sector = campo, si se mantiene el front con los asientos quizas convendria mandar "Fila A", etc.
INSERT INTO evento (titulo, tipo, descripcion, locacion_evento_id) VALUES ('Coldplay', 'Concierto', 'Prueba RF12', 1);