import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../src/tasks/schemas/task.schema';
import { Image } from '../src/tasks/schemas/image.schema';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let taskModel: Model<Task>;
  let imageModel: Model<Image>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  
    app = moduleFixture.createNestApplication();
    await app.init();
  
    taskModel = moduleFixture.get<Model<Task>>(getModelToken('Task'));
    imageModel = moduleFixture.get<Model<Image>>(getModelToken('Image'));
  
    console.log("App initialized and DB models obtained.");
  });
  

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST) - debería crear una nueva tarea y eventualmente procesar imágenes', async () => {
    const createTaskDto = { pathOrUrl: '/Users/josemanuelmachinlorenzo/Downloads/WhatsApp Image 2025-02-07 at 19.49.53 (17).jpeg' };
  
    const postResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201);
  
    expect(postResponse.body).toHaveProperty('taskId');
    expect(postResponse.body).toHaveProperty('status');
    expect(postResponse.body).toHaveProperty('price');
  
    expect(typeof postResponse.body.taskId).toBe('string');
    expect(['completed', 'pending', 'failed']).toContain(postResponse.body.status);
    expect(typeof postResponse.body.price).toBe('number');
    const taskId = postResponse.body.taskId;
    await new Promise(resolve => setTimeout(resolve, 500));
    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);
    expect(Array.isArray(getResponse.body.images)).toBe(true);
    getResponse.body.images.forEach((image: any) => {
      expect(image).toHaveProperty('path');
      expect(image).toHaveProperty('resolution');
      expect(image).toHaveProperty('md5');
  
      // Opcional: Verifica tipos o valores específicos
      expect(typeof image.path).toBe('string');
      expect(typeof image.resolution).toBe('string');
      expect(typeof image.md5).toBe('string');
    });
  });

  it('/tasks (POST) - debería retornar 400 al ingresar un pathOrUrl que no sea string', async () => {
    const createTaskDto = { pathOrUrl: 12345 }; // Aquí proporcionamos un valor que no es una cadena
  
    const postResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(400);
    console.log("respSSS",postResponse.body.message)
    // Puedes agregar expectaciones adicionales para verificar el cuerpo del error si lo deseas
    expect(postResponse.body).toHaveProperty('message');
    expect(postResponse.body.message).toBe('Invalid path: originalPath must be a string'); // Asegúrate de que esto coincida con tu implementación
  });
  
  
  it('/tasks/:taskId (GET) - should return a task by ID', async () => {
    const taskId = '67f3e47283defc541e8ff7b9';
  
    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({
      taskId: expect.any(String),
      status: expect.any(String),
      price: expect.any(Number),
      images: expect.arrayContaining([
        expect.objectContaining({
          path: expect.any(String),
          resolution: expect.any(String),
          md5: expect.any(String),
        }),
      ]),
    }));
  });
  
  it('/tasks/:taskId (GET) - should return 404 if the task is not found', async () => {
    const nonExistentTaskId = '604b2f549c1d2e0eef2686ab';

    await request(app.getHttpServer())
      .get(`/tasks/${nonExistentTaskId}`)
      .expect(404);
  });

  it('/tasks/:taskId (GET) - should return 400 for an invalid ObjectId', async () => {
    await request(app.getHttpServer())
      .get('/tasks/invalidTaskId')
      .expect(400);
  });

  
});
