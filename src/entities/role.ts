import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";

@Entity("roles")
export class Roles {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  roleName: string;
  @Column({ default: 1 })
  org_id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
