import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The path to the original file',
    example: '/path/to/original/file.jpg',
  })
  pathOrUrl: string;
}
