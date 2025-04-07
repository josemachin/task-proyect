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

2. **Clonar el Repositorio**
   
   npm install

3. **Configuración**
  

  Cree un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

  MONGO_URI=tu_uri_de_mongodb

4. **Ejecución**

npm run start:dev
