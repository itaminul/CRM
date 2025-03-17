import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 100, unique: true })
  email: string;

  @Index()
  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  mobile: string;

  @Index()
  @ManyToOne(() => Company, (company) => company.contacts)
  company: Company;

  @Column({ length: 100, nullable: true })
  position: string;

  @Column({ length: 50, nullable: true })
  leadSource: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastContactedAt: Date;

  @Column({ length: 255, nullable: true })
  // Computed property (not stored in DB)
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
