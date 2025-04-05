import { Users } from 'src/entities/users';
import { BaseEntity, DataSource, DataSourceOptions } from 'typeorm';
import { Role } from './entities/role';
import { Contact } from './entities/contact.entity';
import { Company } from './entities/company.entity';

export const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'erpdb',
  password: '123456',
  database: 'crm_db',
  entities: [Users, BaseEntity, Role, Contact, Company],
  migrations: ['./dist/src/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;

// npm run typeorm -- migration:generate -d ./dist/src/data-source.js ./src/migrations/CreateEmployeeAndDepartmentTables
//npm run typeorm -- migration:run -d ./src/data-source.ts
//npm rum migration:run
