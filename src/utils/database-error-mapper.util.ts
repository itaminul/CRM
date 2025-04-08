import { POSTGRES_ERROR_CODES } from '../constants/database-error-codes.const';
import { DatabaseError } from '../interfaces/database-error.interface';

export function mapDatabaseError(error: any): DatabaseError {
  const { code, table, column, constraint, detail } = error;

  switch (code) {
    case POSTGRES_ERROR_CODES.UNIQUE_VIOLATION:
      return {
        type: 'constraint',
        code,
        message: 'Unique constraint violation',
        detail,
        table,
        constraint,
      };

    case POSTGRES_ERROR_CODES.FOREIGN_KEY_VIOLATION:
      return {
        type: 'constraint',
        code,
        message: 'Foreign key violation',
        detail,
        table,
        constraint,
      };

    case POSTGRES_ERROR_CODES.NOT_NULL_VIOLATION:
      return {
        type: 'column',
        code,
        message: 'Not null violation',
        detail,
        table,
        column,
      };

    case POSTGRES_ERROR_CODES.UNDEFINED_TABLE:
      return {
        type: 'table',
        code,
        message: 'Undefined table',
        detail,
        table,
      };

    case POSTGRES_ERROR_CODES.UNDEFINED_COLUMN:
      return {
        type: 'column',
        code,
        message: 'Undefined column',
        detail,
        table,
        column,
      };

    case POSTGRES_ERROR_CODES.CONNECTION_ERROR:
      return {
        type: 'connection',
        code,
        message: 'Database connection error',
        detail,
      };

    default:
      return {
        type: 'unknown',
        code,
        message: 'Database error occurred',
        detail: error.message,
      };
  }
}