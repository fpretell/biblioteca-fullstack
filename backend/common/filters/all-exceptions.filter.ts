// src/common/filters/validation-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, ValidationError } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(BadRequestException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Opcional: Extraer mensajes legibles de errores de validación
    let validationErrors = null;
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse.hasOwnProperty('message') &&
      Array.isArray((exceptionResponse as any).message)
    ) {
      validationErrors = (exceptionResponse as any).message.map((err: ValidationError | string) => {
        if (typeof err === 'string') return err;
        if (typeof err === 'object' && err.constraints) {
          return Object.values(err.constraints).join(', ');
        }
        return err;
      });
    }

    // Loguear error completo en consola para debugging
    console.error('ValidationException:', JSON.stringify(exceptionResponse, null, 2));

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: validationErrors || exceptionResponse,
    });
  }
}
