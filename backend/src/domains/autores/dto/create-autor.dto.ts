import { IsString, isString } from "class-validator";

export class CreateAutorDto {
  @IsString()
  nombre: string;
}
