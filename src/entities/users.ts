import { BaseEntity } from 'src/common/BaseEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  signature: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: 1 })
  org_id: number;
  @Column()
  usergrp_id: number;
  @Column()
  userlevel_id: number;
  @Column()
  roll_id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
  @Column({ nullable: true })
  last_login: string;
  @Column()
  userRoleName: string;
  @Column({ nullable: false })
  createdby: number;
  @Column({ nullable: true })
  updatedby: number;
}
