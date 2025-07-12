import { Test, TestingModule } from '@nestjs/testing';
import { LibrosController } from './libros.controller';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.model';

describe('LibrosController', () => {
  let controller: LibrosController;
  let service: LibrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibrosController],
      providers: [
        {
          provide: LibrosService,
          useValue: {
            findOne: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LibrosController>(LibrosController);
    service = module.get<LibrosService>(LibrosService);
  });

  describe('getById', () => {
    it('debería retornar un libro por id', async () => {
      const libroMock = {
        id: 1,
        titulo: 'Test Libro',
        precio: 100,
        disponible: true,
        autor_id: 1,
        editorial_id: 1,
        genero_id: 1,
      } as Libro;

      jest.spyOn(service, 'findOne').mockResolvedValue(libroMock);

      const result = await controller.getById(1);
      expect(result).toBe(libroMock);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('debería eliminar un libro existente', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debería actualizar un libro existente', async () => {
      const updateDto = { titulo: 'Libro actualizado' };

      const libroMock = {
        id: 1,
        titulo: updateDto.titulo,
        precio: 100,
        disponible: true,
        autor_id: 1,
        editorial_id: 1,
        genero_id: 1,
      } as Libro;

      jest.spyOn(service, 'update').mockResolvedValue(libroMock);

      const result = await controller.update(1, updateDto);
      expect(result).toBe(libroMock);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });
});
