import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventario } from './entities/inventario.model';

@Module({
  imports: [SequelizeModule.forFeature([Inventario])],
  exports: [SequelizeModule],
})
export class InventarioModule {}
