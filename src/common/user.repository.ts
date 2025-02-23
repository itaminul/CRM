import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Users } from 'src/entities/users';
import { IRepository } from './IRepository';

export class UserRepository extends BaseRepository<Users> {
  constructor(repository: Repository<Users>) {
    super(repository);
  }
}
