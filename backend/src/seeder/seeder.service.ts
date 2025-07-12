// import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Autor } from '../domains/autores/entities/autor.model';
// import { Editorial } from '../domains/editoriales/entities/editorial.model';
// import { Genero } from '../domains/generos/entities/genero.model';

// @Injectable()
// export class SeederService implements OnApplicationBootstrap {
//   constructor(
//     @InjectModel(Autor) private autorModel: typeof Autor,
//     @InjectModel(Editorial) private editorialModel: typeof Editorial,
//     @InjectModel(Genero) private generoModel: typeof Genero,
//   ) {}

//   async onApplicationBootstrap() {
//     await this.autorModel.bulkCreate([{ nombre: 'George Orwell' }], { ignoreDuplicates: true });
//     await this.editorialModel.bulkCreate([{ nombre: 'Penguin' }], { ignoreDuplicates: true });
//     await this.generoModel.bulkCreate([{ nombre: 'Ficción' }], { ignoreDuplicates: true });

//     console.log('🔵 Datos iniciales insertados.');
//   }
// }
