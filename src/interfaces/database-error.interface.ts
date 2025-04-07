export interface DatabaseError {
    type: 'table' | 'column' | 'constraint' | 'connection' | 'query' | 'unknown';
    code?: string;
    message: string;
    detail?: string;
    table?: string;
    column?: string;
    constraint?: string;
  }