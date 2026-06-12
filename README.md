# 🎫 TicketFlow - Sistema de Gestión de Tickets

![Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Java](https://img.shields.io/badge/java-22-red)
![Spring Boot](https://img.shields.io/badge/spring%20boot-3.x-green)
![PostgreSQL](https://img.shields.io/badge/postgresql-16-blue)
![Node.js](https://img.shields.io/badge/node.js-18+-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-react-61DAFB?logo=react)
![Docker](https://img.shields.io/badge/docker-enabled-blue)
![API](https://img.shields.io/badge/api-rest--ful-orange)

> **TicketFlow** es una plataforma moderna y completa para la gestión de eventos y venta de tickets. Desarrollado como TP para Trabajo de Campo, permite a los usuarios explorar eventos, comprar tickets, gestionar sus asientos y administrar categorías, salas y usuarios de forma intuitiva y segura.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)
- [Guía de Contribución](#guía-de-contribución)
- [Enlaces del Proyecto](#enlaces-del-proyecto)

## ✨ Características

### Para Usuarios

- 🔍 Exploración de eventos disponibles
- 🎟️ Visualización de asientos disponibles y reserva de tickets
- 👤 Gestión de perfil personal
- 🧾 Historial de tickets adquiridos
- 🔐 Autenticación segura con JWT

### Para Administradores

- 📊 Panel administrativo completo
- 🎪 Gestión de eventos (crear, editar, eliminar)
- 🎭 Gestión de sectores
- 🏛️ Gestión de salas y distribución de asientos
- 👥 Gestión de usuarios del sistema

## 🛠️ Stack Tecnológico

### Frontend

- **Framework:** React 19.2.5
- **Build Tool:** Vite 8.0.10
- **Styling:** Material-UI (MUI) 9.0.1 + Emotion
- **Routing:** React Router DOM 7.15.0
- **Deploy:** Vercel

### Backend

- **Lenguaje:** Java 22
- **Framework:** Spring Boot 3.2.6
- **ORM:** Spring Data JPA + Hibernate
- **Seguridad:** Spring Security + JWT (JSON Web Tokens)
- **Base de Datos:** PostgreSQL 16
- **Documentación API:** Swagger/OpenAPI 2.5.0
- **Generación de PDFs:** OpenPDF 1.3.30
- **Deploy:** Render

### DevOps

- **Containerización:** Docker
- **Orquestación:** Docker Compose
- **Base de Datos:** PostgreSQL 16 (Alpine)

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Git** (para clonar el repositorio)
- **Docker Desktop** y **Docker Compose** (para ejecutar la aplicación completa)
- **Node.js** v18+ y **npm** (si ejecutas el frontend de forma local)
- **Java 22** (si ejecutas el backend de forma local)
- **Maven** (incluido con el proyecto mediante `mvnw`)

> **Nota:** La forma más sencilla de ejecutar el proyecto es usando Docker Compose, que maneja todas las dependencias automáticamente.

## 📁 Estructura del Proyecto

```
TDC-2026-sistema-de-ticket/
├── 📄 docker-compose.yml          # Configuración de contenedores
├── 📄 README.md                   # Este archivo
│
├── 🔧 backend/                    # API REST Spring Boot
│   ├── src/main/java/com/unpaz/backend/
│   │   ├── controller/            # Controladores REST
│   │   ├── service/               # Lógica de negocio
│   │   ├── repository/            # Acceso a datos (JPA)
│   │   ├── model/                 # Entidades JPA
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── mapper/                # Mapeo entre DTOs y Entidades
│   │   └── config/                # Configuración (JWT, CORS, etc.)
│   ├── pom.xml                    # Dependencias Maven
│   └── Dockerfile                 # Imagen Docker del backend
│
├── 🎨 frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   │   └── admin/             # Componentes de administración
│   │   ├── pages/                 # Páginas principales
│   │   ├── layouts/               # Layouts (Header, Footer)
│   │   ├── routes/                # Definición de rutas
│   │   ├── services/              # Servicios (API calls)
│   │   ├── styles/                # Temas y estilos globales
│   │   ├── data/                  # Datos estáticos
│   │   └── assets/                # Imágenes y recursos
│   ├── package.json               # Dependencias npm
│   ├── vite.config.js             # Configuración de Vite
│   └── vercel.json                # Configuración de Vercel
│
├── 📦 db/                         # Scripts y configuraciones de BD
│
└── 📚 docs/                       # Documentación adicional
    ├── doc_swagger.md             # Documentación de API
    ├── DOCKER.md                  # Guía de Docker
    ├── GUIA_DESPLIEGUE.pdf        # Guía de despliegue en Render y Vercel
    └── GUIA_INSTALACION.pdf       # Guía de instalación local
```

## 📚 Documentación de la API

La API REST está completamente documentada con **Swagger/OpenAPI**.

### Acceso a Swagger UI

- **Local:** http://localhost:8080/swagger-ui/index.html
- **Producción:** [Swagger Producción](https://ticketflowbackend.onrender.com/swagger-ui/index.html)

## 🤝 Guía de Contribución

### Flujo de Trabajo

Antes de empezar a trabajar, sigue estos pasos:

1. **Actualizar rama local:**

   ```bash
   git pull origin premaster
   ```

2. **Crear rama de feature:**

   ```bash
   git checkout -b feature/tu-feature-nombre
   ```

   > **Nota:** No hagas merge directo. Crea una rama nueva, súbela y haz un Pull Request.

3. **Crear un Issue:**
   - Crea un issue en el repositorio
   - Nomenclatura: `tipo:descripcion`
   - Ejemplo: `feat: agregar filtro de eventos` o `fix: corregir validación de email`
   - Asignalo a su hito correspondiente

4. **Relacionar rama a issue:**

   ```bash
   git branch --set-upstream-to=origin/feature/tu-feature-nombre
   ```

5. **Hacer commits descriptivos:**

   ```bash
   git commit -m "tipo(scope): descripción breve"
   ```

6. **Subir cambios:**

   ```bash
   git push origin feature/tu-feature-nombre
   ```

7. **Crear Pull Request:**
   - Ve a GitHub y abre un PR
   - Selecciona `premaster` como rama destino
   - Describe los cambios realizados
   - Vincula el issue relacionado

### Ramas Protegidas

- `main` - ✋ Sagrada, solo cambios testeados
- `premaster` - 🔄 Rama de trabajo y experimentación
- `feature/*` - ✨ Tus nuevas características

### Buenas Prácticas

- ✅ Escribe código limpio y legible
- ✅ Usa nombres descriptivos para variables y funciones
- ✅ Comenta código complejo
- ✅ Realiza tests antes de hacer commit
- ✅ Mantén las commits pequeñas y atómicas
- ❌ No hagas merge directo
- ❌ No elimines ramas remotas sin avisar

## 🔗 Enlaces del Proyecto

### Aplicación Desplegada

- **Frontend:** [TicketFlow - Vercel](https://ticketflowunpaz.vercel.app)
- **Backend API:** [API - Render](https://ticketflowbackend.onrender.com)
- **Swagger UI:** [Documentación - Swagger](https://ticketflowbackend.onrender.com/swagger-ui/index.html)

### Documentación Adicional

- [Guía de Docker](./docs/DOCKER.md)
- [Documentación Swagger](./docs/doc_swagger.md)
- [Guía de Instalación Local](./docs/GUIA_INSTALACION.pdf)
- [Guía de Despliegue en Render y Vercel](./docs/GUIA_DESPLIEGUE.pdf)

## 👥 Equipo

Este proyecto es un trabajo grupal desarrollado para UNPAZ como parte del trabajo de campo 2026.

- **Javier** - [GitHub](https://github.com/BicerneJavier)
- **Daniel** - [GitHub](https://github.com/DanOlmed)
- **Lucia** - [GitHub](https://github.com/luciel23)
- **Augusto** - [GitHub](https://github.com/Augustoogas)
- **Leo** - ¿?

## 💡 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la documentación en `./docs/`
2. Consulta los issues existentes
3. Crea un nuevo issue describiendo tu problema
4. Contacta al equipo de desarrollo

**¡Gracias por contribuir a Ticketflow! 🎉**
