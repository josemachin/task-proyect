import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ImageDto } from './image.dto';

export class TaskDto {
  @IsString()
  taskId: string;

  @IsString()
  status: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  images?: { 
    path: string; 
    resolution: string;
  }[];
}
