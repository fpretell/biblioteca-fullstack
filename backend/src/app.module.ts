import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { LibrosModule } from './domains/libros/libros.module';
import { GenerosModule } from './domains/generos/generos.module';
import { EditorialesModule } from './domains/editoriales/editoriales.module';
import { AutoresModule } from './domains/autores/autores.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      models: [], // ← luego agregamos modelos acá o usamos autoLoadModels
    }),
    LibrosModule,
    GenerosModule,
    EditorialesModule,
    AutoresModule,
    AuthModule
  ],
})
export class AppModule {}
