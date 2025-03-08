import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { BaseRepository } from "src/common/repositories/base.repository";
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

  // Add custom repository methods here
  async findByEmail(email: string): Promise<Users | undefined> {
    return this.repository.findOne({ where: { email } })
  }
}

