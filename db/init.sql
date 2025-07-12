-- ============================
-- Tablas
-- ============================

CREATE TABLE autores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE editoriales (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE generos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE libros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  imagen VARCHAR(255),
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  autor_id INTEGER NOT NULL REFERENCES autores(id) ON DELETE CASCADE,
  editorial_id INTEGER NOT NULL REFERENCES editoriales(id) ON DELETE CASCADE,
  genero_id INTEGER NOT NULL REFERENCES generos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE inventario (
  id SERIAL PRIMARY KEY,
  libro_id INTEGER NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  entidad VARCHAR(50) NOT NULL,
  operacion VARCHAR(20) NOT NULL,
  registro_id INTEGER,
  datos_previos JSONB,
  datos_nuevos JSONB,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Índices
-- ============================

CREATE INDEX idx_libros_titulo ON libros(titulo);
CREATE INDEX idx_libros_precio ON libros(precio);
CREATE INDEX idx_libros_disponible ON libros(disponible);
CREATE INDEX idx_libros_autor_id ON libros(autor_id);
CREATE INDEX idx_libros_editorial_id ON libros(editorial_id);
CREATE INDEX idx_libros_genero_id ON libros(genero_id);
CREATE INDEX idx_inventario_libro_id ON inventario(libro_id);
CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email);


-- ============================
-- Datos de ejemplo
-- ============================

-- AUTORES
INSERT INTO autores (nombre) VALUES
('Gabriel García Márquez'),
('Isabel Allende'),
('Jorge Luis Borges'),
('Mario Vargas Llosa'),
('Julio Cortázar'),
('Laura Esquivel'),
('Carlos Ruiz Zafón'),
('Pablo Neruda'),
('Miguel de Cervantes'),
('Federico García Lorca');

-- EDITORIALES
INSERT INTO editoriales (nombre) VALUES
('Editorial Planeta'),
('Penguin Random House'),
('HarperCollins'),
('Editorial Anagrama'),
('Alfaguara'),
('Grupo SM'),
('Debolsillo'),
('Editorial Norma'),
('Ediciones B'),
('Santillana');

-- GENEROS
INSERT INTO generos (nombre) VALUES
('Realismo Mágico'),
('Novela Histórica'),
('Ficción Científica'),
('Poesía'),
('Teatro'),
('Narrativa'),
('Ensayo'),
('Cuento'),
('Literatura Infantil'),
('Biografía');

-- LIBROS
INSERT INTO libros (titulo, precio, disponible, autor_id, editorial_id, genero_id) VALUES
('Cien Años de Soledad', 1500.00, true, 1, 1, 1),
('La Casa de los Espíritus', 1200.00, true, 2, 2, 1),
('Ficciones', 900.00, true, 3, 3, 8),
('La Ciudad y los Perros', 1300.00, true, 4, 4, 2),
('Rayuela', 1100.00, false, 5, 5, 6),
('Como Agua para Chocolate', 1000.00, true, 6, 6, 1),
('La Sombra del Viento', 1400.00, true, 7, 7, 6),
('Veinte Poemas de Amor', 700.00, true, 8, 8, 4),
('Don Quijote de la Mancha', 1600.00, true, 9, 9, 2),
('Bodas de Sangre', 800.00, true, 10, 10, 5);

INSERT INTO inventario (libro_id, cantidad, fecha) VALUES
(1, 15, NOW() - INTERVAL '10 days'),
(2, 30, NOW() - INTERVAL '9 days'),
(3, 5,  NOW() - INTERVAL '8 days'),
(4, 12, NOW() - INTERVAL '7 days'),
(5, 25, NOW() - INTERVAL '6 days'),
(6, 7,  NOW() - INTERVAL '5 days'),
(7, 18, NOW() - INTERVAL '4 days'),
(8, 22, NOW() - INTERVAL '3 days'),
(9, 10, NOW() - INTERVAL '2 days'),
(10,14, NOW() - INTERVAL '1 day');

INSERT INTO usuarios (email, password, nombre)
VALUES (
  'admin@example.com',
  '$2b$10$.pPALROharBoTAjldiSh/efR9YzcTj.BNXsllIwKfsW9tB1.ST4we',
  'Admin'
);





