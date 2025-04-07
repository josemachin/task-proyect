import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The path to the original file',
    example: '/path/to/original/file.jpg',
  })
  @IsString({ message: 'pathOrUrl must be a string' })
  @IsNotEmpty({ message: 'pathOrUrl should not be empty' })
  pathOrUrl: string;
}
