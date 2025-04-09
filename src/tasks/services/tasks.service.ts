import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Image } from '../schemas/image.schema';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { ApplicationFunctionEnum, generateErrorMessage } from '../config/error-messages';
import { TaskDto } from '../dto/task.dto';
import { tasksData } from '../data/tasksData';
import { imagesData } from '../data/imagesData';
import { Task } from '../graphql/task.gql';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel(Task.name) private readonly taskModel,
    @InjectModel(Image.name) private readonly imageModel
  ) {}

  async createTask(originalPath: string): Promise<TaskDto>  {
    if (typeof originalPath !== 'string') {
      throw new BadRequestException('Invalid path: originalPath must be a string');
    }
    if (!fs.existsSync(originalPath)) {
      throw new BadRequestException('File does not exist at the specified path');
    }

    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2));
    const task = await this.taskModel.create({
      status: 'pending',
      price,
      originalPath,
    });

    this.processImage(task._id.toString(), originalPath);
    return task.populate('images').execPopulate(); // Ensure images field is populated for GraphQL response
  }

  async getTaskById(taskId: string): Promise<TaskDto> {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException(`ID ${taskId} is not a valid ObjectId`);
    }

    const task = await this.taskModel.findById(taskId).populate('images').exec();
    
    if (!task) {
      throw new NotFoundException(generateErrorMessage(ApplicationFunctionEnum.TASK_NOT_FOUND, 404));
    }

    // Return the task model including its populated images
    return task;
  }

  async processImage(taskId: string, originalPath: string) {
    try {
      if (!fs.existsSync(originalPath)) {
        throw new Error(generateErrorMessage(ApplicationFunctionEnum.PROCESS_IMAGE, 400));
      }

      const possibleResolutions = [640, 720, 800, 1024, 1080];
      const numOfResolutions = Math.floor(Math.random() * possibleResolutions.length) + 1;
      const resolutions = [];

      for (let i = 0; i < numOfResolutions; i++) {
        const randomIndex = Math.floor(Math.random() * possibleResolutions.length);
        const resolution = possibleResolutions.splice(randomIndex, 1)[0];
        resolutions.push(resolution);
      }

      const uploadDir = path.join(__dirname, '..', '..', '..', 'output');
      resolutions.forEach((res) => {
        const dir = path.join(uploadDir, res.toString());
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });
      
      const task = await this.taskModel.findById(taskId);

      const imageIds = await Promise.all(
        resolutions.map(async (res) => {
          const hash = crypto.createHash('md5').update(originalPath).digest('hex');
          const outputPath = `${uploadDir}/${res}/${hash}.jpg`;
          await sharp(path.resolve(originalPath)).resize(res).toFile(outputPath);

          const imageId = await this.createNewImage(outputPath, res.toString(), hash, taskId);
          return imageId;
        })
      );

      task.images = imageIds as Types.Array<Types.ObjectId>;
      task.status = 'completed';
      task.updatedAt = new Date();
      await task.save();
    } catch (error) {
      const task = await this.taskModel.findById(taskId);
      if (task) {
        task.status = 'failed';
        task.errors = error.message;
        await task.save();
      }
    }
  }

  private async createNewImage(path: string, resolution: string, md5: string, taskId: string) {
    const image = await this.imageModel.create({
      path,
      resolution,
      md5,
      task: taskId,
    });
    return image._id;
  }

  async preloadData(): Promise<void> {
    await this.taskModel.insertMany(tasksData);
    await this.imageModel.insertMany(imagesData);
    console.log('Data preloaded successfully!');
  }
}
