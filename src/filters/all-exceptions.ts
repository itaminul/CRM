import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Unknown error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database query failed';
      error = this.getQueryErrorMessage(exception);
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found';
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.stack;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getQueryErrorMessage(exception: QueryFailedError): string {
    const errorMessage = exception.message.toLowerCase();

    if (
      errorMessage.includes('column') &&
      errorMessage.includes('does not exist')
    ) {
      return 'Column not found';
    }

    if (
      errorMessage.includes('relation') &&
      errorMessage.includes('does not exist')
    ) {
      return 'Table not found';
    }

    if (errorMessage.includes('invalid input syntax for type')) {
      return 'Data type mismatch';
    }

    return 'Database error';
  }
}
