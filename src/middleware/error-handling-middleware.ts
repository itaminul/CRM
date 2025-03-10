import { Injectable, type NestMiddleware, HttpStatus } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Wrap the next function in a try-catch to prevent multiple responses.
    try {
      next();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      // If the response is already sent, we should not attempt to send another.
      if (!res.headersSent) {
        if (err instanceof QueryFailedError) {
          res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Database query failed',
            error: errorMessage,
          });
        } else if (err instanceof EntityNotFoundError) {
          res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Entity not found',
            error: errorMessage,
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            error: errorMessage,
          });
        }
      }
    }
  }
}
