import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Libro } from '../../libros/entities/libro.model';

export interface GeneroAttributes {
  id: number;
  nombre: string;
}

export type GeneroCreationAttributes = Optional<GeneroAttributes, 'id'>;

@Table({ tableName: 'generos', timestamps: false  })
export class Genero extends Model<GeneroAttributes, GeneroCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare nombre: string;

  @HasMany(() => Libro)
  declare libros: Libro[];
}
