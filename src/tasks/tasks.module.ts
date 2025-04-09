import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema, Task } from './schemas/task.schema';
import { ImageSchema, Image } from './schemas/image.schema';
import { TasksResolver } from './resolvers/task.resolver';  // Importa aquí el resolver
import { TasksService } from './services/tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },  // Asegúrate de usar el nombre correcto del modelo
      { name: Image.name, schema: ImageSchema } // Asegúrate de usar el nombre correcto del modelo
    ])
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}





