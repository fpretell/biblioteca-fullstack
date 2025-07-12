import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'common/filters/all-exceptions.filter';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- Importante
import { join } from 'path';
import * as path from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Pipes globales de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // ✅ Filtros Globales Errores
  app.useGlobalFilters(new AllExceptionsFilter());

  // Prefijo Globla
  app.setGlobalPrefix('api/v1');


  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('CMPC Libros API')
    // .setDescription('Documentación Swagger de la API de CMPC Libros')
    .setDescription(`
    API para la gestión de libros.

    **🔐 Autenticación**
    - Para probar los endpoints protegidos, usá el endpoint \`/auth/login\` con este usuario precargado:
      - Email: \`admin@example.com\`
      - Contraseña: \`123456\`
      Usa este JSON en el endpoint \`/auth/login\`:

      {
        "email": "admin@example.com",
        "password": "123456"
      }

    - Copiá el token de la respuesta y hacé click en "Authorize" arriba a la derecha para usarlo.

    - También podés registrar nuevos usuarios con \`/auth/register\`.
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt', // nombre de la seguridad
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document); // ⬅ Swagger bajo mismo prefijo
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // imageness estaticas uploads
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
