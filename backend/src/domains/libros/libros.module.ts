import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Libro } from './entities/libro.model';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Inventario } from '../inventario/entities/inventario.model';
import { Auditoria } from '../auditoria/entities/auditoria.model';
import { Autor } from '../autores/entities/autor.model';
import { Editorial } from '../editoriales/entities/editorial.model';
import { Genero } from '../generos/entities/genero.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Libro, Autor, Editorial, Genero, Inventario, Auditoria]),
    SequelizeModule
  ],
  providers: [LibrosService],
  controllers: [LibrosController],
})
export class LibrosModule {}
