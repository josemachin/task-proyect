import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Image } from '../schemas/image.schema';
import { Model, Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import * as fs from 'fs';
describe('TasksService', () => {
  let tasksService: TasksService;
  let taskModel: Model<Task>;
  let imageModel: Model<Image>;

  const mockTask = {
    _id: new Types.ObjectId(),
    status: 'pending',
    price: 25.5,
    originalPath: '/path/to/original/image.jpg',
    images: [],
    save: jest.fn().mockResolvedValue(true),
  };

  const mockImage = {
    _id: new Types.ObjectId(),
    path: '/path/to/processed/image.jpg',
    resolution: '720',
    md5: 'mockmd5hash',
  };

  const mockTaskModel = {
    create: jest.fn().mockResolvedValue(mockTask),
    findById: jest.fn().mockImplementation((id) => ({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockTask, _id: id }),
      }),
    })),
  };

  const mockImageModel = {
    create: jest.fn().mockResolvedValue(mockImage),
  };

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
        {
          provide: getModelToken(Image.name),
          useValue: mockImageModel,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskModel = module.get<Model<Task>>(getModelToken(Task.name));
    imageModel = module.get<Model<Image>>(getModelToken(Image.name));
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });
  
  it('should create a task with pending status and return its ID', async () => {
    const originalPath = '/Users/josemanuelmachinlorenzo/Downloads/Titulado Jose Machin.jpeg';

    const result = await tasksService.createTask(originalPath);
    expect(result).toHaveProperty('taskId');
    expect(result.status).toBe('pending');
    expect(result.price).toBeGreaterThanOrEqual(5);
    expect(result.price).toBeLessThanOrEqual(50);
  });

  it('should throw BadRequestException if originalPath is not a string', async () => {
    const invalidPath = 123;

    await expect(tasksService.createTask(invalidPath as any)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if file does not exist', async () => {
    const nonExistentPath = '/invalid/path/to/image.jpg';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    await expect(tasksService.createTask(nonExistentPath)).rejects.toThrow(BadRequestException);
  });

  it('should retrieve a task by ID and include images if completed', async () => {
    const taskWithImages = await tasksService.getTaskById(mockTask._id.toString());
    expect(taskWithImages).toHaveProperty('taskId', mockTask._id.toString());
    expect(taskWithImages.status).toBe('pending');
    expect(taskWithImages.images).toEqual([]);
  });

  it('errors during image processing and update task status to failed', async () => {
    const taskId = new Types.ObjectId().toString();
    const originalPath = '/valid/path/to/image.jpg';
    jest.spyOn(fs, 'existsSync').mockImplementation((path) => path === originalPath);
    const mockTask = {
      _id: taskId,
      status: 'pending',
      images: [],
      save: jest.fn().mockResolvedValue(true),
    };
    mockTaskModel.findById.mockResolvedValue(mockTask);
    mockTaskModel.create.mockResolvedValue(mockTask);

    await tasksService.processImage(taskId, originalPath);

    expect(mockTaskModel.findById).toHaveBeenCalledWith(taskId);
    expect(mockTask.status).toBe('failed');
    expect(mockTaskModel.create).toHaveBeenCalled();
  });

  it('It should handle both valid and invalid paths by updating the task status correctly.', async () => {
    const taskId = new Types.ObjectId().toString();

    const cases = [
      { path: '/Users/josemanuelmachinlorenzo/Downloads/WhatsApp Image 2025-02-07 at 19.49.53 (17).jpeg', expectedStatus: 'completed' },
      { path: '/invalid/path/image.jpg', expectedStatus: 'failed' },
    ];

    for (const { path, expectedStatus } of cases) {
      jest.spyOn(fs, 'existsSync').mockImplementation((providedPath) => providedPath === path);
  

      const mockTask = {
        _id: taskId,
        status: 'pending',
        images: [],
        save: jest.fn().mockResolvedValue(true),
      };
      mockTaskModel.findById.mockResolvedValue(mockTask);
      mockTaskModel.create.mockResolvedValue(mockTask);

      await tasksService.processImage(taskId, path);

      expect(mockTaskModel.findById).toHaveBeenCalledWith(taskId);
      expect(mockTask.status).toBe(expectedStatus);
      expect(mockTaskModel.create).toHaveBeenCalled();

      jest.clearAllMocks();
    }
  });

  it('It should throw an exception if the idtask is invalid', async () => {
    const invalidId = '67f2a9e2b9fe9ce1de41';
  
    await expect(
      tasksService.getTaskById(invalidId),
    ).rejects.toThrow(BadRequestException);
  });

  it('It should throw NotFoundException if the task is not found', async () => {
    jest.spyOn(taskModel, 'findById').mockImplementationOnce(() => ({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null),
    }) as any); 
    const validId = new Types.ObjectId().toHexString();
  
    try {
      await tasksService.getTaskById(validId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
  
});


