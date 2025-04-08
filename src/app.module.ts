import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', 
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TasksModule,
  ],
})
export class AppModule {}

