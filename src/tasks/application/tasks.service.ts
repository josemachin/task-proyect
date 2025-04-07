import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Task } from '../schemas/task.schema'; 
import { Image } from '../schemas/image.schema';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>
  ) {}

  /**
   * Crea una nueva tarea y procesa una imagen.
   * @param originalPath - Ruta al archivo original de la imagen.
   * @returns Un objeto que contiene el ID de la tarea, su estado y precio.
   */
  async createTask(originalPath: string): Promise<{ taskId: string; status: string; price: number }> {
    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)); // Genera un precio aleatorio para la tarea
    const task = await this.taskModel.create({
      status: 'pending',
      price,
      originalPath,
    });

    // Procesa la imagen asociada a la tarea
    this.processImage(task._id.toString(), originalPath);
    return { taskId: task._id.toString(), status: task.status, price };
  }

  /**
   * Obtiene una tarea por su ID.
   * @param taskId - El ID de la tarea a buscar.
   * @returns Información detallada de la tarea, incluyendo sus imágenes asociadas.
   */
  async getTaskById(taskId: string): Promise<{
    taskId: string;
    status: string;
    price: number;
    images: { path: string; resolution: string; md5: string }[];
  }> {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException(`ID ${taskId} no es un ObjectId válido`);
    }

    const task = await this.taskModel.findById(taskId).populate('images').exec();
    
    if (!task) throw new NotFoundException('Task not found');

    const images = (task.images as any[]).map((image) => ({
      path: image.path,
      resolution: image.resolution,
      md5: image.md5,
    }));

    return {
      taskId: task._id.toString(),
      status: task.status,
      price: task.price,
      images,
    };
  }

  /**
   * Procesa una imagen asociada a una tarea, generando múltiples resoluciones.
   * @param taskId - ID de la tarea correspondiente.
   * @param originalPath - Ruta al archivo original de la imagen.
   */
  private async processImage(taskId: string, originalPath: string) {
    try {
      // Verificación de existencia de archivo
      if (!fs.existsSync(originalPath)) {
        throw new Error(`Input file is missing: ${originalPath}`);
      }

      const possibleResolutions = [640, 720, 800, 1024, 1080]; // Resoluciones posibles
      const numOfResolutions = Math.floor(Math.random() * (possibleResolutions.length)) + 1;
      const resolutions = [];

      // Selección de resoluciones aleatorias
      for (let i = 0; i < numOfResolutions; i++) {
        const randomIndex = Math.floor(Math.random() * possibleResolutions.length);
        const resolution = possibleResolutions.splice(randomIndex, 1)[0];
        resolutions.push(resolution);
      }

      const uploadDir = path.join(__dirname, '..', '..', '..', 'output');

      // Crea directorios para las resoluciones seleccionadas
      resolutions.forEach((res) => {
        const dir = path.join(uploadDir, res.toString());
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      const task = await this.taskModel.findById(taskId);

      const imageIds = await Promise.all(
        resolutions.map(async (res) => {
          // Procesa la imagen con `sharp` para cada resolución
          const hash = crypto.createHash('md5').update(originalPath).digest('hex');
          const outputPath = `${uploadDir}/${res}/${hash}.jpg`;
          await sharp(path.resolve(originalPath)).resize(res).toFile(outputPath);

          const imageId = await this.createNewImage(outputPath, res.toString(), hash, taskId);
          return imageId;
        })
      );

      // Actualiza la tarea
      task.images = imageIds as Types.Array<Types.ObjectId>;
      task.status = 'completed';
      task.updatedAt = new Date();
      await task.save();
    } catch (error) {
      // Manejo de errores en el procesamiento de la imagen
      const task = await this.taskModel.findById(taskId);
      task.status = 'failed';
      task.errors = error.message;
      await task.save();
      console.error('Error processing image:', error.message);
    }
  }

  /**
   * Crea una nueva entrada de imagen en la base de datos.
   * @param path - Ruta de la imagen procesada.
   * @param resolution - Resolución de la imagen.
   * @param md5 - Hash MD5 de la imagen.
   * @param taskId - ID de la tarea relacionada.
   * @returns El ID de la imagen creada.
   */
  private async createNewImage(path: string, resolution: string, md5: string, taskId: string) {
    const image = await this.imageModel.create({
      path,
      resolution,
      md5,
      task: taskId,
    });

    return image._id;
  }
}
