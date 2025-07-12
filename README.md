# 📚 Biblioteca - Sistema de Gestión

Proyecto fullstack para gestión de libros. Incluye API REST con NestJS, frontend en React y base de datos PostgreSQL. Todo desplegable con Docker Compose.

---

## 🚀 Características principales

- Autenticación con JWT.
- Operaciones CRUD para libros, autores, editoriales, géneros e inventario.
- Exportación de datos en formato CSV.
- Soft delete (eliminación lógica).
- Logging/auditoría de operaciones.
- Arquitectura modular basada en principios **SOLID**.
- Transacciones para operaciones críticas.

---

## 🪖 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize ORM](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- JWT para autenticación

---

## 📂 Estructura del repositorio

```
/
├── backend/
│   ├── src/
│   │   ├── libros/
│   │   ├── autores/
│   │   ├── editoriales/
│   │   ├── generos/
│   │   ├── inventario/
│   │   ├── auditoria/
│   │   └── auth/
├── frontend/
├── docker-compose.yml
├── .env
└── README.md
```

---

## ⚙️ Instalación y ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/biblioteca.git
cd biblioteca
```

### 2. Crea el archivo `.env`

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=libros_user
DB_PASSWORD=libros_pass
DB_NAME=cmpc_libros
JWT_SECRET=libros_secret
JWT_EXPIRES_IN=2h
```

### 3. Levanta todo con Docker Compose

```bash
docker-compose up --build
```

Esto levantará:

- El contenedor de PostgreSQL con datos persistentes.
- El contenedor de NestJS (backend) en modo desarrollo.
- El contenedor de React (frontend) en modo desarrollo.

---

## 🔗 Accesos principales

- **API Backend**: [http://localhost:3000](http://localhost:3000)
- **Swagger Docs**: [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)
- **App Frontend**: [http://localhost:3001](http://localhost:3001)

---

## 📃 Usuario de prueba

```json
{
  "email": "admin@example.com",
  "password": "Libros2024@"
}
```

---

## 🧩 Frontend

### Ubicación

```bash
/frontend
```

### Tecnologías

- React + TypeScript
- React Router
- React Hook Form
- Bootstrap

### Variables de entorno `.env`

```env
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
REACT_APP_API_VERSION=v1
PORT=3001
REACT_APP_DEFAULT_EMAIL=admin@example.com
REACT_APP_DEFAULT_PASSWORD=Libros2025@
```

### Scripts disponibles

```bash
npm start       # Inicia el dev server
npm run build   # Build para producción
npm run test    # Ejecuta tests
```

### Docker Compose

```yaml
services:
  frontend:
    build:
      context: ./frontend
    container_name: cmpc_libros_frontend
    working_dir: /app
    volumes:
      - ./frontend:/app
    ports:
      - "3001:3000"  # React corre en 3000 internamente
    environment:
      - CHOKIDAR_USEPOLLING=true
    command: ["npm", "start"]
    depends_on:
      - backend
```

- **Puerto interno:** `3000`
- **Puerto externo:** `3001`
- Acceso: [http://localhost:3001](http://localhost:3001)

---

## 🔧 Scripts comunes (backend)

```bash
# Levantar NestJS en modo dev
npm run start:dev

# Compilar en modo producción
npm run build

# Ejecutar tests
npm run test
```

---

## 🔐 Autenticación

Autenticación basada en JWT. Al hacer login, recibirás un `access_token` que deberás enviar en los headers:

```http
Authorization: Bearer <token>
```

---

## 🔍 Endpoints principales

Documentados automáticamente en Swagger: [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)

Incluye endpoints para:

- Libros
- Autores
- Editoriales
- Géneros
- Inventario
- Auditoría
- Autenticación (login, register)

---

## ✏️ TODO futuro

- Roles de usuario y permisos.
- CI/CD con GitHub Actions.

---

## 🌐 Autor

Félix Pretell - [LinkedIn](https://www.linkedin.com/in/felix-pretell/)

---

## ❤️ Licencia

Este proyecto está bajo la licencia MIT.
