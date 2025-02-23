import type { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IBaseEntity, IBaseRepository } from '../interface/base.interface';

export abstract class BaseRepository<T extends IBaseEntity>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return await this.repository.save(entity);
  }

  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data);
    return await this.repository.save(entities);
  }

  async findAll(options?: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find({
      where: options,
    });
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  async findByCondition(condition: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find({
      where: condition,
    });
  }

  async count(condition: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.count({
      where: condition,
    });
  }
}
