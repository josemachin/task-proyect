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

3. **Ejecución**

  npm run start:dev

4. **Arquitectura del Proyecto**

  Directorios Principales
  tasks/schemas: Contiene los esquemas de Mongoose para Image y Task.
  infrastructure/dto: Define los Data Transfer Objects (DTOs) usados para validar y tipar datos de entrada.
  infrastructure/controllers: Implementa controladores como TasksController para manejar solicitudes HTTP.
  application: Incluye la lógica principal de negocio dentro de TasksService, manejando la creación de tareas y procesamiento de imágenes.
  Esquemas Mongoose
  TaskSchema: Modela tareas con atributos como estado, precio y referencias a imágenes.
  ImageSchema: Modela imágenes asociadas a tareas, almacenando información como ruta, resolución y hash MD5.

5. **Decisiones de Diseño**

  Persistencia en MongoDB usando Mongoose: Permite una estructura flexible y poderosa para modelar datos.
  Procesamiento de Imágenes con Sharp: Permite manipular imágenes eficientemente, generando múltiples resoluciones.
  Validación y Documentación: Uso de DTOs con decorators de class-validator y Swagger para asegurar datos correctos y proporcionar documentación de API.


6. **Pruebas**
  
  npm run test
  Las pruebas abarcan  la lógica de negocio en TasksService 

7. **Inicialización de Base de Datos:**

  Datos de Prueba: Carga Inicial
  Este proyecto incluye un mecanismo para cargar datos de prueba en la base de datos MongoDB. El propósito de esta operación es inicializar la base de datos con datos predefinidos para facilitar el desarrollo y las pruebas del sistema.

  Función preloadData
  La función preloadData inserta un conjunto de documentos en las colecciones Task e Image. A continuación, se detalla cómo se lleva a cabo este proceso:

  Definición de Datos:

  Se definen dos conjuntos de datos JSON: uno para tareas (tasksData) y otro para imágenes (imagesData).
  Cada tarea contiene información como estado, precio, ruta original de la imagen y referencias a objetos Image.
  Las fechas son instancias de Date, asegurando un formato adecuado para MongoDB.
  Uso de ObjectId:

  Las claves identificadoras (_id) y las referencias a otras colecciones están estructuradas usando Types.ObjectId para garantizar integridad y referencia correcta entre documentos.
  Inserción en la Base de Datos:

  Se utilizan los métodos insertMany de Mongoose para insertar en bloque los documentos definidos.
  Si la operación es exitosa, los datos estarán disponibles para todas las operaciones posteriores en la aplicación.
  Mensajes de Éxito:

  Una vez completada la carga de datos, se emite un mensaje en consola indicando que los datos de prueba han sido cargados exitosamente en la base de datos.
  Ejecución
  Para ejecutar el proceso de carga de datos:

  Asegúrate de que tu servidor de MongoDB esté funcionando localmente o remoto, según tu configuración.
  Llama a preloadData() dentro de cualquier método o script de inicialización.
  Verifica la consola para confirmar que los datos se han cargado sin errores.
