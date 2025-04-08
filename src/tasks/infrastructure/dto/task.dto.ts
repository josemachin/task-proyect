import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';

export class TaskDto {
  @ApiProperty({
    description: 'The ID of the task',
    example: '604b2f549c1d2e0eef2686ac',
  })
  @IsString()
  taskId: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'completed',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'The price of the task',
    example: 29.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'List of images associated with the task',
    type: [ImageDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  images?: ImageDto[];
}
