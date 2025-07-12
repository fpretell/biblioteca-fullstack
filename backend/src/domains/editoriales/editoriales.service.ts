import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editorial } from './entities/editorial.model';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { EditorialCreationAttributes } from './entities/editorial.model';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectModel(Editorial)
    private editorialModel: typeof Editorial,
  ) {}

  create(dto: CreateEditorialDto): Promise<Editorial> {
    return this.editorialModel.create(dto as EditorialCreationAttributes);
  }

  findAll(): Promise<Editorial[]> {
    return this.editorialModel.findAll();
  }

  async findOne(id: number): Promise<Editorial> {
    const editorial = await this.editorialModel.findByPk(id);
    if (!editorial) {
      throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
    }
    return editorial;
  }

  async remove(id: number): Promise<void> {
    const editorial = await this.findOne(id);
    await editorial.destroy();
  }
}
