import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Libro } from 'src/domains/libros/entities/libro.model';

interface InventarioCreationAttrs {
  libro_id: number;
  cantidad: number;
  fecha?: Date;
}

@Table({
  tableName: 'inventario',
  timestamps: true,
  createdAt: 'fecha',
  updatedAt: false,
})
export class Inventario extends Model<Inventario, InventarioCreationAttrs> {
  @ForeignKey(() => Libro)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare libro_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare cantidad: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare fecha: Date;

  @BelongsTo(() => Libro)
  declare libro: Libro;
}
