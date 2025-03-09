import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Users } from 'src/entities/users';
import { IRepository } from './IRepository';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    repository: Repository<Users>,
  ) {
    super(repository);
  }
}
