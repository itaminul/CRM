import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { DatabaseException } from '../exceptions/database.exception';
import dataSource from 'src/data-source';
@Injectable()
export class DatabaseConnectionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
      next();
    } catch (error) {
      throw new DatabaseException('Unable to connect to the database');
    }
  }
}
