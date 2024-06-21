# README - Gestión de Asientos para Sistema de Coworking - Backend

## Descripción del Proyecto
Este proyecto implementa una API backend para la gestión de reservas de espacios de trabajo en un sistema de coworking. La API permite a los usuarios ver y reservar espacios de trabajo en sesiones específicas, facilitando la gestión de la ocupación de espacios y mejorando la experiencia de los usuarios.

## Historia de Usuario
Como Product Owner, quiero que los usuarios puedan reservar espacios de trabajo en un coworking para una sesión específica y así facilitar la gestión de ocupación de espacios y mejorar la experiencia de los usuarios.

## Instrucciones para Configurar y Ejecutar el Proyecto Localmente

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL

### Pasos para Configuración

1. **Clonar el repositorio:**
    ```
    git clone <URL-del-repositorio>
    cd <nombre-del-repositorio>
    ```

2. **Instalar dependencias:**
    ```
    npm install
    ```

3. **Configurar la base de datos:**
    - Crear una base de datos PostgreSQL para el proyecto.
    - Configurar las variables de entorno en el archivo `.env`:
    ```
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=your_db_username
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=your_db_name
    ```

4. **Ejecutar migraciones:**
    ```
    npm run typeorm migration:run
    ```

5. **Iniciar la aplicación:**
    ```
    npm run start:dev
    ```

### Acceso a Swagger
Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación de Swagger en la siguiente URL:

http://localhost:3000/api


## Pruebas de la API
Se ha implementado un conjunto de pruebas funcionales. El video de prueba utilizando Postman está disponible en el siguiente enlace:
[Link al Video de Prueba](#)

## Estructura del Proyecto
- **src/**: Contiene el código fuente de la aplicación.
    - **modules/**: Módulos organizados por funcionalidad (users, sessions, workspaces).
    - **filters/**: Filtros de excepciones personalizados.
    - **main.ts**: Punto de entrada de la aplicación.

## GitFlow
Se ha seguido el flujo de trabajo GitFlow para la gestión de ramas y versiones del código.

## Buenas Prácticas
- Principios de diseño SOLID.
- Código limpio, mantenible y escalable.

## Enlaces de Entregables
- **Repositorio Backend:** [https://github.com/AlexanderHernandez17/Coworking_Seat_Management.git](#)
- **Swagger Deployado en la Nube:** [http://localhost:3000/api](#)
- **Video de Pruebas:** [Link al Video](#)

## Contacto
Si tienes alguna pregunta o necesitas más información, no dudes en contactarme a través del siguiente correo electrónico: [alexander.hdez.2001@gmail.com]
