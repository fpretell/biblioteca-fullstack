import type { CreationAttributes } from 'sequelize';
import { Auditoria } from '../entities/auditoria.model';

// export interface AuditoriaCreateDto extends CreationAttributes<Auditoria> {
//   entidad: string;
//   operacion: string;
//   registro_id: number;
//   datos_previos: object | null;
//   datos_nuevos: object | null;
//   fecha?: Date;
// }


export interface AuditoriaCreateDto {
  entidad: string;
  operacion: string;
  registro_id: number;
  datos_previos: object | null;
  datos_nuevos: object | null;
  fecha?: Date;
}
