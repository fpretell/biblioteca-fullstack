// src/domains/libros/libros.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { UpdateLibroDto } from './dto/update-libro.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { CreateLibroConInventarioDto } from './dto/create-libro-con-inventario.dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiBearerAuth('jwt')
@ApiTags('Libros')
@UseGuards(JwtAuthGuard)
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get('/health')
  healthCheck() {
    return { status: 'ok' };
  }

  @Get('export/csv')
  async exportToCsv(@Res() res: Response) {
    const libros = await this.librosService.findAllWithRelations();

    const plainData = libros.map((libro) => ({
      id: libro.id,
      titulo: libro.titulo,
      precio: libro.precio,
      disponible: libro.disponible,
      autor: libro.autor?.nombre,
      editorial: libro.editorial?.nombre,
      genero: libro.genero?.nombre,
    }));

    const fields = ['id', 'titulo', 'precio', 'disponible', 'autor', 'editorial', 'genero'];
    const parser = new Parser({ fields });
    const csv = parser.parse(plainData);

    res.header('Content-Type', 'text/csv');
    res.attachment('libros.csv');
    res.send(csv);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los libros con relaciones' })
  @ApiResponse({ status: 200, description: 'Libros encontrados' })
  getAll(@Query() query: any) {
    return this.librosService.findAll(query);
  }

  // @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  // @ApiOperation({ summary: 'Crear un libro con inventario inicial' })
  // @ApiResponse({ status: 201, description: 'Libro creado con inventario' })
  // @ApiBody({
  //   type: CreateLibroConInventarioDto,
  //   examples: {
  //     ejemplo: {
  //       summary: 'Ejemplo básico',
  //       value: {
  //         titulo: 'El arte del código limpio',
  //         precio: 450.0,
  //         disponible: true,
  //         autor_id: 1,
  //         editorial_id: 2,
  //         genero_id: 3,
  //         cantidad: 20,
  //         fecha: '2025-07-08T15:00:00Z',
  //       },
  //     },
  //   },
  // })

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto,
  ) {
    return this.librosService.update(id, updateLibroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un libro' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.remove(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  @ApiOperation({ summary: 'Crear un libro con inventario inicial' })
  @ApiResponse({ status: 201, description: 'Libro creado con inventario' })
  @ApiBody({
    type: CreateLibroConInventarioDto,
    description: 'Libro a crear',
  })
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateLibroConInventarioDto) {
    if (file) {
      dto.imagen = file.filename;
    }
    return this.librosService.createWithInventory(dto);
  }


}
