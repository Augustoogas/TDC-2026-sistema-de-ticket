# 📖 Documentación de la API con Swagger/OpenAPI 3

## 📌 Resumen del Módulo

Se ha integrado **SpringDoc OpenAPI** para generar una interfaz interactiva que permite visualizar, probar y documentar todos los endpoints del backend. Esta herramienta actúa como el contrato oficial entre el Backend y el Frontend.

----------

## 🛠️ Configuración del Sistema

### 1. Dependencia Principal

Se utiliza la librería `springdoc-openapi-starter-webmvc-ui` en el `pom.xml` para la autogeneración de la documentación.

### 2. Clase de Configuración (`OpenApiConfig.java`)

Se implementó una configuración global para habilitar la seguridad en la interfaz:

-   **Esquema de Seguridad**: `bearerAuth`.
    
-   **Tipo**: HTTP Bearer (JWT).
    
-   **Propósito**: Permitir el envío del token de acceso en las cabeceras de las peticiones de prueba.
    

### 3. Ajustes de Seguridad (`SecurityConfig.java`)

Para permitir el acceso público a la documentación sin interferir con la seguridad JWT, se habilitaron las siguientes rutas:

-   `/v3/api-docs/`
    
-   `/swagger-ui/`
    
-   `/swagger-ui.html`
    

----------

## 🚀 Guía de Uso e Integración

### Acceso a la Interfaz

La documentación es accesible en tiempo de ejecución a través de:

👉 `http://localhost:8080/swagger-ui/index.html`

### Cómo realizar pruebas de endpoints protegidos

Para los endpoints que requieren rol de `CLIENTE` o `ADMIN`:

1.  **Obtención del Token**: Ir al tag **Autenticación**, usar el endpoint `/api/auth/login` y copiar el string del campo `token`.
    
2.  **Autorización**: Hacer clic en el botón **"Authorize"** (icono de candado) arriba a la derecha.
    
3.  **Persistencia**: Pegar el token y confirmar. Ahora todas las peticiones incluirán automáticamente la cabecera `Authorization: Bearer <token>`.
    

----------

## 📋 Componentes Documentados

### Controladores (Controllers)

**Grupo**

**Responsabilidad**

**Autenticación**

Registro, Login y recuperación de perfil (`/me`).

**Eventos**

Consulta de cartelera y creación de eventos (Admin).

**Reservas**

Flujo completo: creación, confirmación y cancelación.

**Clientes/Admins**

Gestión y listado de usuarios según privilegios.

**Tickets**

Generación de comprobantes de compra.

### Modelos de Datos (DTOs)

Se han enriquecido los objetos de transferencia con ejemplos reales y descripciones:

-   **`RegisterRequest`**: Campos validados para el alta de usuarios.
    
-   **`ReservaDTO`**: Incluye estados de reserva y formatos de fecha (`ISO-8601`).
    
-   **`UserProfileDto`**: Estructura de respuesta con roles jerárquicos.
    

----------

## ✅ Estado de la Implementación

-   **Visualización de Schemas**: Activa (al final de la página de Swagger).
    
-   **Validaciones**: Se reflejan las restricciones de campos obligatorios.
    
-   **CORS**: Configurado para permitir peticiones desde el origen del Frontend.
    

----------

> **Nota para el equipo**: Ante cualquier cambio en la estructura de un Controller o DTO, las anotaciones `@Operation` y `@Schema` deben ser actualizadas para mantener la integridad de este documento.
