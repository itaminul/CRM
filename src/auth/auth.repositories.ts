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
    try {
      console.log("check one username from repository", username);
      const user = await this.repository.findOne({
        where: { username:'123' }, // or use { username: username } if necessary for clarity
       relations: ['role'], // Include role relation if you need the role info along with the user
      });
      console.log("check one", user);
      return user;
    } catch (error) {
      // Handle any potential errors (logging or throwing exceptions as needed)
      throw new Error('Error retrieving user');
    }
  }
}
