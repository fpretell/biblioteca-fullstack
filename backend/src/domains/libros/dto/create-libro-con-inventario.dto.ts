import { CreateLibroDto } from './create-libro.dto';
import { IsInt, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateLibroConInventarioDto extends CreateLibroDto {
  
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Type(() => Number)
  cantidad: number;

  @IsOptional()
  @Type(() => Date)
  fecha?: Date;
}
