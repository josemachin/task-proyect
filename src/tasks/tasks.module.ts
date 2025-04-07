import { Module } from '@nestjs/common';
import { TasksService } from '../application/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { ImageSchema } from './schemas/image.schema';


import { TasksController } from 'src/infrastructure/controllers/tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: 'Task', schema: TaskSchema },
    { name: 'Image', schema: ImageSchema }])
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}




