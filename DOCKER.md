# Docker - TicketFlow UNPAZ

### Requisitos

- Docker Desktop instalado
- Docker Compose (incluido con Docker Desktop)
- Cambiar las variables de entorno en `.env`
  (se puede copiar `.env.example` y cambiar los valores)

## Comandos Básicos

### Iniciar los servicios

```bash
docker compose up -d
```

### Detener los servicios

```bash
docker compose down
```

### Ver contenedores activos

```bash
docker compose ps
```

### Ver logs del backend

```bash
docker compose logs -f backend
```

### Ver logs de PostgreSQL

```bash
docker compose logs -f postgres
```

### Detener y eliminar volúmenes (ADVERTENCIA: elimina datos)

```bash
docker compose down -v
```

### Reconstruir la imagen del backend

```bash
docker compose build --no-cache backend
```

### Reconstruir todo

```bash
docker compose build --no-cache
```

## Acceso

- **Backend API**: http://localhost:8081
- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **PostgreSQL**: localhost:5432

## Estructura

- `docker-compose.yml`: Orquestación de servicios
- `backend/Dockerfile`: Imagen del backend (compilación multi-etapa)
- `backend/.dockerignore`: Archivos excluidos de la imagen
- `.env.example`: Variables de entorno de referencia

## Notas

- El backend está configurado para conectarse a `postgres:5432` (nombre del servicio)
- PostgreSQL tiene un health check que espera 10 segundos antes de iniciar el backend
- Los datos de la base de datos persisten en `postgres_data` volume
- Spring Boot ejecuta automáticamente `import.sql` al iniciar la aplicación
- La aplicación reconstruye automáticamente las tablas si es necesario (ddl-auto: update)

## Desarrollo

Para desarrollo local (sin Docker):

```bash
# Backend
cd backend
mvn spring-boot:run

# Asegúrate de tener PostgreSQL corriendo en localhost:5432
```
