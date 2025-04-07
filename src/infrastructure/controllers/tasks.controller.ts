import { Controller, Get, Post, Body, Param, BadRequestException, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TasksService } from 'src/application/tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task with image processing' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const { pathOrUrl } = createTaskDto;
    if (!pathOrUrl) {
      throw new BadRequestException('Invalid input data.');
    }
    return this.tasksService.createTask(pathOrUrl);
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'The task was found and returned.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }
}
