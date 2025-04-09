import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../graphql/task.gql';


@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('originalPath') originalPath: string): Promise<TaskDto> {
    return this.tasksService.createTask(originalPath);
  }

  @Query(() => Task, { nullable: true })
  getTaskById(@Args('taskId', { type: () => String }) taskId: string): Promise<TaskDto> {
    return this.tasksService.getTaskById(taskId);
  }
}
