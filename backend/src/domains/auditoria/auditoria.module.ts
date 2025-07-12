// src/domains/auditoria/auditoria.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auditoria } from './entities/auditoria.model';

@Module({
  imports: [SequelizeModule.forFeature([Auditoria])],
  exports: [SequelizeModule], // necesario para inyectarlo desde otros módulos
})
export class AuditoriaModule {}
