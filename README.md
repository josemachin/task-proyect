# {{projectName}}

{{projectDescription}}

## Índice

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Ejecución](#ejecución)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Decisiones de Diseño](#decisiones-de-diseño)
6. [Pruebas](#pruebas)
7. [Uso de GraphQL](#Uso de GraphQL)

## Descripción del Proyecto

Este proyecto es una aplicación web construida con NestJS que permite gestionar tareas asociadas a imágenes, procesándolas en diferentes resoluciones y guardando su estado y detalles en MongoDB.

## Instalación

Siga estos pasos para configurar el entorno de desarrollo:

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/josemachin/task-proyect.git
   cd {{projectDirectory}}

2. **Instalación**
   
   npm install

3. **Ejecución**

  npm run start:dev

4. **Arquitectura del Proyecto**

  tasks/schemas: Contiene los esquemas de Mongoose para Image y Task.
infrastructure/dto: Define los Data Transfer Objects (DTOs) usados para validar y tipar datos de entrada.
infrastructure/resolvers: Implementa resolvers como TasksResolver para manejar solicitudes GraphQL.
application: Incluye la lógica principal de negocio dentro de TasksService, manejando la creación de tareas y procesamiento de imágenes.

**Esquemas Mongoose**

TaskSchema: Modela tareas con atributos como estado, precio y referencias a imágenes.
ImageSchema: Modela imágenes asociadas a tareas, almacenando información como ruta, resolución y hash MD5.

5. **Decisiones de Diseño**

Persistencia en MongoDB usando Mongoose: Permite una estructura flexible y poderosa para modelar datos.
Procesamiento de Imágenes con Sharp: Permite manipular imágenes eficientemente, generando múltiples resoluciones.
Validación y Documentación: Uso de DTOs con decorators de class-validator.
Integración de GraphQL con Resolvers: Utilizando resolvers para manejar las operaciones de consulta y mutación con un enfoque más directo y auto-documentable.


6. **Pruebas**
  
  npm run test
  Las pruebas abarcan  la lógica de negocio en TasksService
  

  7. **Uso de GraphQL**

  Para probar las queries y mutations, accede a la interfaz de GraphQL en http://localhost:3000/graphql.

  **mutation** {
  createTask(originalPath: "/Users/josemanuelmachinlorenzo/Downloads/WhatsApp Image 2025-02-07 at 19.49.53 (17).jpeg") {
    id
    status
    price
    originalPath
    images {
      path
      resolution
      md5
    }
  }
}

**query** {
  getTaskById(taskId: "tu-id-de-tarea-aquí") {
    id
    status
    price
    originalPath
    images {
      _id
      path
      resolution
      md5
    }
  }
}

