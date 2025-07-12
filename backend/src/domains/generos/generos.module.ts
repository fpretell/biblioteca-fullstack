import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genero } from './entities/genero.model';
import { GenerosService } from './generos.service';
import { GenerosController } from './generos.controller';

@Module({
  imports: [SequelizeModule.forFeature([Genero])],
  controllers: [GenerosController],
  providers: [GenerosService],
})
export class GenerosModule {}
