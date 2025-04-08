import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TaskDto } from '../dto/task.dto';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTask = {
    taskId: '123123kasd',
    status: 'pending',
    price: 25.5,
    pathOrUrl: '/path/to/image.jpg',
    images: [],
  };

  const mockTasksService = {
    createTask: jest.fn().mockResolvedValue(mockTask),
    getTaskById: jest.fn().mockImplementation((taskId) => {
      if (taskId === mockTask.taskId) {
        return Promise.resolve(mockTask);
      }
      throw new NotFoundException();
    }),
    preloadData: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task and return the task data', async () => {
      const createTaskDto: CreateTaskDto = { pathOrUrl: '/path/to/image.jpg' };
      const result = await tasksController.create(createTaskDto);
      expect(result).toEqual(mockTask);
      expect(tasksService.createTask).toHaveBeenCalledWith(createTaskDto.pathOrUrl);
    });

    it('should throw BadRequestException if input data is invalid', async () => {
      jest.spyOn(tasksService, 'createTask').mockRejectedValueOnce(new NotFoundException());

      const createTaskDto: CreateTaskDto = { pathOrUrl: '' }; // Invalid input
      await expect(tasksController.create(createTaskDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const result = await tasksController.findOne(mockTask.taskId);
      expect(result).toEqual(mockTask);
      expect(tasksService.getTaskById).toHaveBeenCalledWith(mockTask.taskId);
    });

    it('should throw NotFoundException if task not found', async () => {
      await expect(tasksController.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('preloadData', () => {
    it('should execute preload data successfully', async () => {
      const result = await tasksController.preloadData();
      expect(result).toEqual({ message: 'Data preloaded successfully' });
      expect(tasksService.preloadData).toHaveBeenCalled();
    });
  });
});
