import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Autor } from '../../autores/entities/autor.model';
import { Editorial } from '../../editoriales/entities/editorial.model';
import { Genero } from '../../generos/entities/genero.model';

export interface LibroAttributes {
  id: number;
  titulo: string;
  precio: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  imagen: string;
}

export type LibroCreationAttributes = Optional<LibroAttributes, 'id'>;

@Table({ tableName: 'libros', paranoid: true, timestamps: true })
export class Libro extends Model<LibroAttributes, LibroCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare titulo: string;

  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @Column(DataType.BOOLEAN)
  declare disponible: boolean;

  @ForeignKey(() => Autor)
  @Column(DataType.INTEGER)
  declare autor_id: number;

  @ForeignKey(() => Editorial)
  @Column(DataType.INTEGER)
  declare editorial_id: number;

  @ForeignKey(() => Genero)
  @Column(DataType.INTEGER)
  declare genero_id: number;

  @BelongsTo(() => Autor)
  declare autor: Autor;

  @BelongsTo(() => Editorial)
  declare editorial: Editorial;

  @BelongsTo(() => Genero)
  declare genero: Genero;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

  @Column(DataType.STRING)
  declare imagen?: string;

  @DeletedAt
  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt: Date | null;

}
