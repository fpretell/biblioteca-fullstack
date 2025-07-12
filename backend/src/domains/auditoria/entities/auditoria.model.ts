import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

interface AuditoriaCreationAttrs {
  entidad: string;
  operacion: string;
  registro_id: number;
  datos_previos: object | null;
  datos_nuevos: object | null;
  fecha?: Date;
}

@Table({
  tableName: 'auditoria',
  timestamps: true,
  createdAt: 'fecha',
  updatedAt: false,
})
export class Auditoria extends Model<Auditoria, AuditoriaCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare entidad: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare operacion: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare registro_id: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare datos_previos: object | null;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare datos_nuevos: object | null;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare fecha: Date;
}
