import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Autor } from './entities/autor.model';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';

@Module({
  imports: [SequelizeModule.forFeature([Autor])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
