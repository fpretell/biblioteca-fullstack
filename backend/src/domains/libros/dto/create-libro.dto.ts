import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLibroDto {
  @IsString()
  titulo: string;

  @IsNumber()
  @Type(() => Number)
  precio: number;

  @IsBoolean()
  @Type(() => Boolean)
  disponible: boolean;

  @IsNumber()
  @Type(() => Number)
  autor_id: number;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsNumber()
  @Type(() => Number)
  editorial_id: number;

  @IsNumber()
  @Type(() => Number)
  genero_id: number;
}
