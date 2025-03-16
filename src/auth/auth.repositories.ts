import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { UserRepository } from 'src/common/user.repository';
import { Role } from 'src/entities/role';
import { Users } from 'src/entities/users';
import type { Repository } from 'typeorm';

@Injectable()
export class AuthRepositories extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    repository: Repository<Users>,
  ) {
    super(repository);
  }

  async save(userDto) {}

  // Add custom repository methods here
  async findByUserName(username: string): Promise<Users | undefined> {
    return this.repository.findOne({ where: { username } });
  }

  async findOneUser(username: any) {
    return this.repository.findOne({
      where: { username: username },
      relations: ['role'],
    });
  }

  async findOne(username: any): Promise<Users | any> {
    // Extract the username property if it's an object
    if (typeof username === 'object' && username.username) {
      username = username.username; // Extract the username property
    }

    // Ensure username is a string
    if (typeof username !== 'string') {
      username = String(username); // Convert to string
    }

    try {
      const normalizedUsername = username.trim().toLowerCase(); // Normalize the username
      const user = await this.repository.findOne({
        where: { username: normalizedUsername }, // Use the normalized username
        relations: ['role'],
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw new Error('Error retrieving user');
    }
  }
}
