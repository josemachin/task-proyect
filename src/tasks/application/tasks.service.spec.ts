import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Image } from '../schemas/image.schema';
import { Model, Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

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

  it('should retrieve a task by ID and include images if completed', async () => {
    // Simulate task retrieval
    const taskWithImages = await tasksService.getTaskById(mockTask._id.toString());
    expect(taskWithImages).toHaveProperty('taskId', mockTask._id.toString());
    expect(taskWithImages.status).toBe('pending');
    expect(taskWithImages.images).toEqual([]);
  });

  it('It should throw an exception if the idtask is invalid', async () => {
    const invalidId = '67f2a9e2b9fe9ce1de41';
  
    await expect(
      tasksService.getTaskById(invalidId),
    ).rejects.toThrow(BadRequestException);
  });

  it('"It should throw NotFoundException if the task is not found', async () => {
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


