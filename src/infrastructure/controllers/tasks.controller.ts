import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TasksService } from 'src/application/tasks.service';

@ApiTags('tasks') 
@Controller('tasks') 
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Endpoint para crear una nueva tarea que involucra el procesamiento de imágenes.
   * @param createTaskDto - Datos de entrada para la creación de la tarea, usando un DTO que incluye la ruta o URL de la imagen.
   * @returns La nueva tarea creada tras el procesamiento exitoso.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new task with image processing' })
  @ApiBody({ type: CreateTaskDto }) 
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const { pathOrUrl } = createTaskDto;
    if (!pathOrUrl) {
      throw new BadRequestException('Invalid input data.'); // Lanza una excepción si los datos de entrada no son válidos
    }
    return this.tasksService.createTask(pathOrUrl); // Llama al servicio de tareas para crear una tarea
  }

  /**
   * Endpoint para obtener una tarea por su ID.
   * @param taskId - El ID de la tarea que se quiere recuperar.
   * @returns Los detalles de la tarea solicitada si existe.
   */
  @Get(':taskId')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'The task was found and returned.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId); // Llama al servicio de tareas para obtener una tarea por ID
  }
}
