import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.model';
import { Inventario } from '../inventario/entities/inventario.model';
import { Auditoria } from '../auditoria/entities/auditoria.model';
import { Autor } from '../autores/entities/autor.model';
import { Editorial } from '../editoriales/entities/editorial.model';
import { Genero } from '../generos/entities/genero.model';

describe('LibrosService', () => {
  let service: LibrosService;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          logging: false,
          models: [Libro, Inventario, Auditoria, Autor, Editorial, Genero],
          synchronize: true,
        }),
        SequelizeModule.forFeature([Libro, Inventario, Auditoria]),
      ],
      providers: [LibrosService],
    }).compile();

    service = module.get<LibrosService>(LibrosService);
    sequelize = module.get<Sequelize>(Sequelize);

    await sequelize.sync({ force: true });

    // Crear registros necesarios para las claves foráneas
    await Autor.create({ id: 1, nombre: 'Autor Test' });
    await Editorial.create({ id: 1, nombre: 'Editorial Test' });
    await Genero.create({ id: 1, nombre: 'Genero Test' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createWithInventory should create libro with inventario and auditoria', async () => {
    const dto = {
      titulo: 'Libro Test',
      precio: 123.45,
      disponible: true,
      autor_id: 1,
      editorial_id: 1,
      genero_id: 1,
      cantidad: 10,
      fecha: new Date(),
    };

    const libro = await service.createWithInventory(dto);

    expect(libro).toBeDefined();
    expect(libro.titulo).toBe(dto.titulo);

    // Opcional: verificar inventario
    const inventario = await Inventario.findOne({ where: { libro_id: libro.id } });
    expect(inventario).toBeDefined();
    expect(inventario?.cantidad).toBe(dto.cantidad);

    // Opcional: verificar auditoría
    const auditoria = await Auditoria.findOne({ where: { registro_id: libro.id, entidad: 'libros' } });
    expect(auditoria).toBeDefined();
    expect(auditoria?.operacion).toBe('create');
  });

    it('findAll should return array of libros', async () => {
    const libros = await service.findAll({});
    expect(Array.isArray(libros)).toBe(true);
    expect(libros.length).toBeGreaterThan(0);
  });

  it('findOne should return a single libro', async () => {
    const all = await service.findAll({});
    const libro = await service.findOne(all[0].id);
    expect(libro).toBeDefined();
    expect(libro.id).toBe(all[0].id);
  });

  it('update should modify an existing libro', async () => {
    const all = await service.findAll({});
    const updated = await service.update(all[0].id, {
      titulo: 'Nuevo Titulo',
      precio: 999,
      disponible: false,
    });
    expect(updated.titulo).toBe('Nuevo Titulo');
    expect(updated.precio).toBe(999);
    expect(updated.disponible).toBe(false);
  });

    it('remove should delete an existing libro', async () => {
    const libro = await service.createWithInventory({
        titulo: 'Libro para borrar',
        precio: 10,
        disponible: true,
        autor_id: 1,
        editorial_id: 1,
        genero_id: 1,
        cantidad: 5,
        fecha: new Date(),
    });

    await service.remove(libro.id);

    await expect(service.findOne(libro.id)).rejects.toThrowError('Libro con ID ' + libro.id + ' no encontrado');
    });

  
});
