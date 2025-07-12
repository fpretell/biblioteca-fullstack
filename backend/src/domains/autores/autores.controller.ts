import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { Response } from 'express';
import { Parser } from 'json2csv';

@ApiTags('Autores')
@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  create(@Body() dto: CreateAutorDto) {
    return this.autoresService.create(dto);
  }

  @Get()
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.autoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.autoresService.remove(id);
  }
  
  @Get('export/csv')
  async exportAutoresToCsv(@Res() res: Response) {
    const data = await this.autoresService.exportToCsvData();

    const fields = ['id', 'nombre', 'cantidadLibros'];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('autores.csv');
    res.send(csv);
  }
}
