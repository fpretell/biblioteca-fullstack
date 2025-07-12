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

export interface EditorialAttributes {
  id: number;
  nombre: string;
}

export type EditorialCreationAttributes = Optional<EditorialAttributes, 'id'>;

@Table({ tableName: 'editoriales', timestamps: false  })
export class Editorial extends Model<EditorialAttributes, EditorialCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare nombre: string;

  @HasMany(() => Libro)
  declare libros: Libro[];
}
