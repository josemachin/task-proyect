import { IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  path: string; // Cambiado de Path a path para coincidir con el esquema

  @IsString()
  resolution: string;

  @IsString()
  md5: string;
}
