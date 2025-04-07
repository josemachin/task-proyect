import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Task } from '../schemas/task.schema'; 
import { Image } from '../schemas/image.schema';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { ApplicationFunctionEnum, generateErrorMessage } from '../../errors/error-messages';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>
  ) {}

  /**
   * Crea una nueva tarea en la base de datos y procesa una imagen asociada.
   * 
   * @param originalPath - La ruta al archivo original de la imagen.
   * @returns Un objeto que contiene el ID de la tarea, su estado y precio.
   * @throws BadRequestException Si el originalPath no es válido o el archivo no existe.
   */
  async createTask(originalPath: string): Promise<{ taskId: string; status: string; price: number }> {
    if (typeof originalPath !== 'string') {
      throw new BadRequestException('Invalid path: originalPath must be a string');
    }
    if (!fs.existsSync(originalPath)) {
      throw new BadRequestException('File does not exist at the specified path');
    }

    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)); // Genera un precio aleatorio.
    const task = await this.taskModel.create({
      status: 'pending',
      price,
      originalPath,
    });

    // Procesa la imagen asociada a la tarea en segundo plano.
    this.processImage(task._id.toString(), originalPath);
    return { taskId: task._id.toString(), status: task.status, price };
  }

  /**
   * Obtiene una tarea por su ID desde la base de datos.
   * 
   * @param taskId - El ID de la tarea a buscar.
   * @returns Información detallada de la tarea, incluyendo sus imágenes asociadas.
   * @throws BadRequestException Si el taskId no es un ObjectId válido.
   * @throws NotFoundException Si la tarea no es encontrada.
   */
  async getTaskById(taskId: string): Promise<{
    taskId: string;
    status: string;
    price: number;
    images: { path: string; resolution: string; md5: string }[];
  }> {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException(`ID ${taskId} is not a valid ObjectId`);
    }

    const task = await this.taskModel.findById(taskId).populate('images').exec();
    
    if (!task) {
      throw new NotFoundException(generateErrorMessage(ApplicationFunctionEnum.TASK_NOT_FOUND, 404));
    }

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
   * 
   * @param taskId - ID de la tarea correspondiente.
   * @param originalPath - Ruta al archivo original de la imagen.
   */
  private async processImage(taskId: string, originalPath: string) {
    try {
      
      if (!fs.existsSync(originalPath)) {
        throw new Error(generateErrorMessage(ApplicationFunctionEnum.PROCESS_IMAGE, 400));
      }

      // Establece las posibles resoluciones para el procesamiento.
      const possibleResolutions = [640, 720, 800, 1024, 1080];
      const numOfResolutions = Math.floor(Math.random() * (possibleResolutions.length)) + 1;
      const resolutions = [];

      // Selecciona resoluciones aleatorias para el procesamiento.
      for (let i = 0; i < numOfResolutions; i++) {
        const randomIndex = Math.floor(Math.random() * possibleResolutions.length);
        const resolution = possibleResolutions.splice(randomIndex, 1)[0];
        resolutions.push(resolution);
      }

      const uploadDir = path.join(__dirname, '..', '..', '..', 'output');

      // Crea directorios necesarios para guardar las imágenes procesadas.
      resolutions.forEach((res) => {
        const dir = path.join(uploadDir, res.toString());
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });
      

      const task = await this.taskModel.findById(taskId);

      // Procesa la imagen para cada resolución seleccionada.
      const imageIds = await Promise.all(
        resolutions.map(async (res) => {
          const hash = crypto.createHash('md5').update(originalPath).digest('hex');
          const outputPath = `${uploadDir}/${res}/${hash}.jpg`;
          await sharp(path.resolve(originalPath)).resize(res).toFile(outputPath);

          const imageId = await this.createNewImage(outputPath, res.toString(), hash, taskId);
          return imageId;
        })
      );

      // Actualiza la tarea con las nuevas imágenes procesadas.
      task.images = imageIds as Types.Array<Types.ObjectId>;
      task.status = 'completed';
      task.updatedAt = new Date();
      await this.taskModel.create(task)
    } catch (error) {
      // Manejo de errores durante el procesamiento de imágenes.
      const task = await this.taskModel.findById(taskId);
      task.status = 'failed';
      task.errors = error.message;
      await this.taskModel.create(task)
      console.error('Error processing image:', error.message);
    }
  }

  /**
   * Crea una nueva entrada de imagen en la base de datos.
   * 
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
