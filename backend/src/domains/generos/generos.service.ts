import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genero } from './entities/genero.model';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { GeneroCreationAttributes } from './entities/genero.model';

@Injectable()
export class GenerosService {
  constructor(
    @InjectModel(Genero)
    private generoModel: typeof Genero,
  ) {}

  create(dto: CreateGeneroDto): Promise<Genero> {
    return this.generoModel.create(dto as GeneroCreationAttributes);
  }

  findAll(): Promise<Genero[]> {
    return this.generoModel.findAll();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoModel.findByPk(id);
    if (!genero) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }
    return genero;
  }

  async remove(id: number): Promise<void> {
    const genero = await this.findOne(id);
    await genero.destroy();
  }
}
