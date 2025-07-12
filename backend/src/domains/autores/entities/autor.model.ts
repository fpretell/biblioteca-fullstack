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

export interface AutorAttributes {
  id: number;
  nombre: string;
}

export type AutorCreationAttributes = Optional<AutorAttributes, 'id'>;

@Table({ tableName: 'autores', timestamps: false })
export class Autor extends Model<AutorAttributes, AutorCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare nombre: string;

  @HasMany(() => Libro)
  declare libros: Libro[];
}
