import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Unknown error';
    let details: string | undefined;

    
    if (exception instanceof UnauthorizedException) {
      // Handle UnauthorizedException specifically
      status = HttpStatus.UNAUTHORIZED;
      message = 'Invalid credentials';
      error = 'Unauthorized';

      // Extract details from the exception message
      const exceptionMessage = exception.message;
      if (exceptionMessage.includes('No user found for username')) {
        details = 'No user found with the provided username';
      } else if (exceptionMessage.includes('Invalid credentials')) {
        details = 'Incorrect username or password';
      } else {
        details = exceptionMessage; // Fallback to the original message
      }
    } else if (exception instanceof HttpException) {
      // Handle other HttpExceptions
      status = exception.getStatus();
      message = exception.message;
      error = exception.name;
    } else if (exception instanceof QueryFailedError) {
      // Handle TypeORM QueryFailedError
      status = HttpStatus.BAD_REQUEST;
      message = 'Database query failed';
      error = this.getQueryErrorMessage(exception);
    } else if (exception instanceof EntityNotFoundError) {
      // Handle TypeORM EntityNotFoundError
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found';
    } else if (exception instanceof Error) {
      // Handle generic errors
      message = exception.message;
      error = exception.stack || 'Unknown error';
    }

    // Construct the response
    const responseBody = {
      statusCode: status,
      message,
      error,
      details, // Include details for UnauthorizedException
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Send the response
    response.status(status).json(responseBody);
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