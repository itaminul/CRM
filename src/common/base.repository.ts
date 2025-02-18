import type { Repository, DeepPartial, FindOptionsWhere, BaseEntity, ObjectLiteral } from "typeorm"
import { NotFoundException } from "@nestjs/common"

export class BaseRepository<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find()
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> })
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }
    return entity
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data)
    return this.repository.save(entity)
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as DeepPartial<T> & ObjectLiteral)
    return this.findById(id)
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }
  }
}

