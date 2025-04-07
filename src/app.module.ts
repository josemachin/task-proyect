import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TasksModule,
    
    
  ],
})
export class AppModule {}


