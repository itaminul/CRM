import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

export class TypeORMException extends HttpException {
  constructor(error: Error) {
    let message = 'Database operation failed';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (error instanceof QueryFailedError) {
      message = 'Database query failed';
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (error instanceof EntityNotFoundError) {
      message = 'Entity not found';
      statusCode = HttpStatus.NOT_FOUND;
    }

    super(message, statusCode);
  }
}
