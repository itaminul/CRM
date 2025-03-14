import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleTables1740975901135 implements MigrationInterface {
    name = 'CreateRoleTables1740975901135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdby" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedby" integer NOT NULL, "name" character varying, "username" character varying NOT NULL, "email" character varying, "password" character varying NOT NULL, "image" character varying, "signature" character varying, "address" character varying, "org_id" integer NOT NULL DEFAULT '1', "usergrp_id" integer NOT NULL, "userlevel_id" integer NOT NULL, "roll_id" integer NOT NULL, "active_status" integer NOT NULL DEFAULT '1', "last_login" character varying, "userRoleName" character varying NOT NULL, "role_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
