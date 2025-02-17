import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleNameUsersTables1737964296460 implements MigrationInterface {
    name = 'AddRoleNameUsersTables1737964296460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userRoleName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userRoleName"`);
    }

}
