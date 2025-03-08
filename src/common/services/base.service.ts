import { NotFoundException } from "@nestjs/common"
import type { DeepPartial } from "typeorm"

import type { PaginationDto } from "../dto/base.dto"
import { IBaseEntity, IBaseRepository } from "../interface/base.interface";

export abstract class BaseService<T extends IBaseEntity> {
  constructor(private readonly repository: IBaseRepository<T>) {}

//   async create(createDto: DeepPartial<T>): Promise<T> {
//     return await this.repository.create(createDto)
//   }

  async findAll(paginationDto?: PaginationDto): Promise<{ items: T[]; total: number }> {
    const [items, total] = await Promise.all([this.repository.findAll(), this.repository.count({})])

    if (paginationDto) {
      const { page, limit } = paginationDto
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      return {
        items: items.slice(startIndex, endIndex),
        total,
      }
    }

    return { items, total }
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne(id)
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`)
    }
    return entity
  }

//   async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
//     return await this.repository.update(id, updateDto)
//   }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async findByCondition(condition: any): Promise<T[]> {
    return await this.repository.findByCondition(condition)
  }
}

