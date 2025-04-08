import { Controller, Get, Post, Body, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TaskDto } from '../dto/task.dto';
import { TasksService } from 'src/tasks/application/tasks.service';
import { generateErrorMessage, ApplicationFunctionEnum } from 'src/errors/error-messages';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task with image processing' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: TaskDto })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const task = await this.tasksService.createTask(createTaskDto.pathOrUrl);
    return task;
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'The task was found and returned.', type: TaskDto })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('taskId') taskId: string): Promise<TaskDto> {
    const task = await this.tasksService.getTaskById(taskId);
    if (!task) {
      throw new NotFoundException(generateErrorMessage(ApplicationFunctionEnum.TASK_NOT_FOUND, 404));
    }
    return task;
  }

  @Post('preload')
  @ApiOperation({ summary: 'Preload data into the database' })
  @ApiResponse({ status: 201, description: 'Data has been successfully preloaded.' })
  async preloadData() {
    await this.tasksService.preloadData();
    return { message: 'Data preloaded successfully' };
  }
}
