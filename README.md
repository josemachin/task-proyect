<<<<<<< HEAD
# {{projectName}}

{{projectDescription}}

## Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Ejecución](#ejecución)
5. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
6. [Decisiones de Diseño](#decisiones-de-diseño)
7. [Pruebas](#pruebas)
8. [Inicialización de Base de Datos](#inicialización-de-base-de-datos)

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

3. **Configuración BD**
   
   mongodb://localhost:27017


4. **Ejecución**

  npm run start:dev

5. **Arquitectura del Proyecto**

  Directorios Principales
  tasks/schemas: Contiene los esquemas de Mongoose para Image y Task.
  infrastructure/dto: Define los Data Transfer Objects (DTOs) usados para validar y tipar datos de entrada.
  infrastructure/controllers: Implementa controladores como TasksController para manejar solicitudes HTTP.
  application: Incluye la lógica principal de negocio dentro de TasksService, manejando la creación de tareas y procesamiento de imágenes.
  Esquemas Mongoose
  TaskSchema: Modela tareas con atributos como estado, precio y referencias a imágenes.
  ImageSchema: Modela imágenes asociadas a tareas, almacenando información como ruta, resolución y hash MD5.

6. **Decisiones de Diseño**

  Persistencia en MongoDB usando Mongoose: Permite una estructura flexible y poderosa para modelar datos.
  Procesamiento de Imágenes con Sharp: Permite manipular imágenes eficientemente, generando múltiples resoluciones.
  Validación y Documentación: Uso de DTOs con decorators de class-validator y Swagger para asegurar datos correctos y proporcionar documentación de API.


7. **Pruebas**
  
  npm run test
  Las pruebas abarcan tanto la lógica de negocio en TasksService 



 8.**Crear un script de inicialización en scripts/init-db.js:**

const mongoose = require('mongoose');
const { TaskSchema } = require('../tasks/schemas/task.schema');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('Task', TaskSchema);

async function initializeDb() {
  try {
    await Task.create({
      status: 'completed',
      price: 20,
      originalPath: '/path/to/sample.jpg',
      images: [],
    });
    console.log('Database initialized with sample data!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
}

initializeDb();


node scripts/init-db.js

