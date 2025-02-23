export interface IBaseEntity {
    id: number
    createdAt: Date
    updatedAt: Date
  }
  
  export interface IBaseRepository<T extends IBaseEntity> {
    create(data: Partial<T>): Promise<T>
    findAll(): Promise<T[]>
    findOne(id: number): Promise<T>
    update(id: number, data: Partial<T>): Promise<T>
    delete(id: number): Promise<void>
    findByCondition(condition: any): Promise<T[]>
    count(condition: any): Promise<number>
  }
  
  