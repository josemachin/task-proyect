import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImageDto {
  @ApiProperty({
    description: 'The path to the image file',
    example: '/path/to/image/file.jpg',
  })
  @IsString()
  path: string; 

  @ApiProperty({
    description: 'Resolution of the image',
    example: '800px',
  })
  @IsString()
  resolution: string;

  @ApiProperty({
    description: 'Hash of the image path',
    example: '8e358ac881c51d27249bdc4f44904397',
  })
  @IsString()
  md5: string;
}
