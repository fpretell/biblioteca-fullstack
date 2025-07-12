import { IsString } from 'class-validator';

export class CreateEditorialDto {
  @IsString()
  nombre: string;
}
