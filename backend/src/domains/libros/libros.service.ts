import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Libro } from './entities/libro.model';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { CreationAttributes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Inventario } from '../inventario/entities/inventario.model';
import { Auditoria } from '../auditoria/entities/auditoria.model';
import { AuditoriaCreateDto } from '../auditoria/dto/create-auditoria.dto';
import { Op } from 'sequelize';
import { Autor } from '../autores/entities/autor.model';
import { Editorial } from '../editoriales/entities/editorial.model';
import { Genero } from '../generos/entities/genero.model';

@Injectable()
export class LibrosService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Libro) private libroModel: typeof Libro,
    @InjectModel(Autor) private readonly autorModel: typeof Autor,
    @InjectModel(Inventario) private inventarioModel: typeof Inventario,
    @InjectModel(Auditoria) private auditoriaModel: typeof Auditoria,
  ) {}
async findAll(query: any): Promise<{
  libros: Libro[],
  total: number,
  page: number,
  totalPages: number
}> {
  const where: any = {};
  const order: any[] = [];

  // Filtro por disponibilidad
  if (query.disponible !== undefined) {
    where.disponible = query.disponible === 'true';
  }

  // Filtro por género
  if (query.genero_id) {
    where.genero_id = +query.genero_id;
  }

  // ✅ Filtro por editorial
  if (query.editorial_id) {
    where.editorial_id = +query.editorial_id;
  }

  // ✅ Filtro por autor
  if (query.autor_id) {
    where.autor_id = +query.autor_id;
  }

  // Búsqueda por título
  if (query.search) {
    where.titulo = { [Op.iLike]: `%${query.search}%` };
  }

  // Ordenamiento múltiple dinámico
  if (query.order) {
    const fields = query.order.split(',');
    for (const field of fields) {
      const [key, direction] = field.split(':');
      if (key && direction && ['asc', 'desc'].includes(direction.toLowerCase())) {
        const dir = direction.toUpperCase();

        if (key === 'editorial') {
          order.push([{ model: Editorial, as: 'editorial' }, 'nombre', dir]);
        } else if (key === 'genero') {
          order.push([{ model: Genero, as: 'genero' }, 'nombre', dir]);
        } else if (key === 'autor') {
          order.push([{ model: Autor, as: 'autor' }, 'nombre', dir]);
        } else {
          // Orden por columna directa de libro
          order.push([key, dir]);
        }
      }
    }
  } else {
    order.push(['id', 'ASC']);
  }


  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  const { rows, count } = await this.libroModel.findAndCountAll({
    where,
    order,
    limit,
    offset,
    include: [
      { model: Autor, attributes: ['id', 'nombre'] },
      { model: Editorial, attributes: ['id', 'nombre'] },
      { model: Genero, attributes: ['id', 'nombre'] },
    ],
  });

  return {
    libros: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}






  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroModel.findByPk(id);
    if (!libro)
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    return libro;
  }

  async update(id: number, updateDto: UpdateLibroDto): Promise<Libro> {
    const transaction = await this.sequelize.transaction();
    try {
      const libro = await this.findOne(id);
      const datosPrevios = libro.toJSON();

      const libroActualizado = await libro.update(updateDto, { transaction });

      const auditoriaData: AuditoriaCreateDto = {
        entidad: 'libros',
        operacion: 'update',
        registro_id: id,
        datos_previos: datosPrevios,
        datos_nuevos: libroActualizado.toJSON(),
      };

      const auditoriaInstance = this.auditoriaModel.build(auditoriaData as any);
      await auditoriaInstance.save({ transaction });

      await transaction.commit();
      return libroActualizado;
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException('Error al actualizar el libro');
    }
  }

  async remove(id: number): Promise<void> {
    const transaction = await this.sequelize.transaction();
    try {
      const libro = await this.findOne(id);
      const datosPrevios = libro.toJSON();

      await this.libroModel.destroy({ where: { id }, transaction });

      const auditoriaData: AuditoriaCreateDto = {
        entidad: 'libros',
        operacion: 'delete',
        registro_id: id,
        datos_previos: datosPrevios,
        datos_nuevos: null,
      };

      const auditoriaInstance = this.auditoriaModel.build(auditoriaData as any);
      await auditoriaInstance.save({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException('Error al eliminar el libro');
    }
  }

  create(createLibroDto: CreateLibroDto): Promise<Libro> {
    return this.libroModel.create(createLibroDto);
  }

  async findAllWithRelations() {
    return this.libroModel.findAll({
      include: ['autor', 'editorial', 'genero'],
    });
  }

  async createWithInventory(
    dto: CreateLibroDto & { cantidad: number; fecha?: Date },
  ): Promise<Libro> {
    const transaction = await this.sequelize.transaction();
    try {
      const {
        titulo,
        precio,
        disponible,
        autor_id,
        editorial_id,
        genero_id,
        imagen, // ✅ imagen es requerido
        cantidad,
        fecha,
      } = dto;

      const libro = await this.libroModel.create(
        {
          titulo,
          precio,
          disponible,
          autor_id,
          editorial_id,
          genero_id,
          imagen, // ✅ guardar imagen en la BD
        },
        { transaction },
      );

      await this.inventarioModel.create(
        {
          libro_id: libro.id,
          cantidad,
          fecha: fecha || new Date(),
        },
        { transaction },
      );

      const auditoriaData: AuditoriaCreateDto = {
        entidad: 'libros',
        operacion: 'create',
        registro_id: libro.id,
        datos_previos: null,
        datos_nuevos: libro.toJSON(),
      };

      const auditoriaInstance = this.auditoriaModel.build(
        auditoriaData as CreationAttributes<Auditoria>,
      );
      await auditoriaInstance.save({ transaction });

      await transaction.commit();
      return libro;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
