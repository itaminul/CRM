import type { BaseEntity, DeepPartial } from 'typeorm';

import type { BaseRepository } from './base.repository';

export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<T> {
    return this.repository.findById(id);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
