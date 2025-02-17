import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1737880725195 implements MigrationInterface {
  name = "CreateUsersTable1737880725195";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "old_new_status" integer NOT NULL DEFAULT '1', "name" character varying NOT NULL, "email" character varying NOT NULL, "email_address" character varying NOT NULL, "email_verified_at" TIMESTAMP NOT NULL, "password" character varying NOT NULL, "image" character varying NOT NULL, "signature" character varying NOT NULL, "address" character varying NOT NULL, "phase_no" integer NOT NULL, "doctorId" integer NOT NULL DEFAULT '1', "org_id" integer NOT NULL DEFAULT '1', "course_type" integer NOT NULL, "course_name" integer NOT NULL, "contact_no" character varying NOT NULL, "department_id" integer NOT NULL, "batch_id" integer NOT NULL, "student_id" integer NOT NULL, "student_type" integer NOT NULL, "usergrp_id" integer NOT NULL, "userlevel_id" integer NOT NULL, "designation" integer NOT NULL, "roll_id" integer NOT NULL, "remember_token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active_status" integer NOT NULL DEFAULT '1', "is_admin" integer NOT NULL DEFAULT '0', "last_login" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
