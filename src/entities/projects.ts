import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  projectName: string;
  @Column()
  projectDescripton: string;
  @Column()
  address: string;
  @Column()
  contactNo: string;
  @Column()
  phone: string;
  @Column()
  emailAddress: string;
  @Column({ default: 1 })
  org_id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
}
