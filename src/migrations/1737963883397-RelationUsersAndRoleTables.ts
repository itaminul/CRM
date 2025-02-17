import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUsersAndRoleTables1737963883397 implements MigrationInterface {
    name = 'RelationUsersAndRoleTables1737963883397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
    }

}
