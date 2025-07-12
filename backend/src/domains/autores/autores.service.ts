import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Autor } from './entities/autor.model';
import { CreateAutorDto } from './dto/create-autor.dto';
import { Optional } from 'sequelize';
import { Libro } from '../libros/entities/libro.model';

type AutorCreationAttributes = Optional<{
  id: number;
  nombre: string;
}, 'id'>;

@Injectable()
export class AutoresService {
  constructor(
    @InjectModel(Autor)
    private readonly autorModel: typeof Autor,
  ) {}

  create(dto: CreateAutorDto): Promise<Autor> {
    return this.autorModel.create(dto as AutorCreationAttributes);
  }

  findAll(): Promise<Autor[]> {
    return this.autorModel.findAll();
  }

  async findOne(id: number): Promise<Autor> {
    const autor = await this.autorModel.findByPk(id);
    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    return autor;
  }

  async remove(id: number): Promise<void> {
    const autor = await this.findOne(id);
    await autor.destroy();
  }

  async exportToCsvData(): Promise<any[]> {
    const autores = await this.autorModel.findAll({
      include: [Libro],
    });

    return autores.map((autor) => ({
      id: autor.id,
      nombre: autor.nombre,
      cantidadLibros: autor.libros?.length ?? 0,
    }));
  }
}
