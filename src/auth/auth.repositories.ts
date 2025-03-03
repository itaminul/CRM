import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { BaseRepository } from "src/common/repositories/base.repository";
import { UserRepository } from "src/common/user.repository";
import { Users } from "src/entities/users";
import type { Repository } from "typeorm"

@Injectable()
export class AuthRepositories extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    repository: Repository<Users>,
  ) {
    super(repository);
  }

  async save(userDto) {

  }

  // Add custom repository methods here
  async findByUserName(username: string): Promise<Users | undefined> {
    return this.repository.findOne({ where: { username } })
  }
}

