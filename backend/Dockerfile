# ============================================
# ETAPA 1 - BUILD
# ============================================

# Imagen base con Java 22 JDK sobre Alpine Linux
# Se usa para compilar el proyecto Maven
FROM eclipse-temurin:22-jdk-alpine AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /build

# Instalar Maven
RUN apk add --no-cache maven

# Copiar pom.xml
COPY pom.xml .

# Descargar dependencias
RUN mvn dependency:go-offline

# Copiar código fuente
COPY src ./src

# Compilar aplicación
RUN mvn clean package -DskipTests

# ============================================
# ETAPA 2 - RUNTIME
# ============================================

FROM eclipse-temurin:22-jre-alpine

WORKDIR /app

# Copiar JAR generado
COPY --from=builder /build/target/*.jar app.jar

# Puerto de Spring Boot
EXPOSE 8080

# Ejecutar aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]