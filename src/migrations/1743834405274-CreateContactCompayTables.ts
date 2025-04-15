import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactCompayTables1743834405274 implements MigrationInterface {
    name = 'CreateContactCompayTables1743834405274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "industry" character varying(50), "website" character varying(255), "address" text, "city" character varying(50), "state" character varying(50), "zip" character varying(20), "country" character varying(50), "phone" character varying(20), "annualRevenue" numeric(15,2), "employeeCount" integer, "orgId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3dacbb3eb4f095e29372ff8e13" ON "companies" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d618bf519adc88b3eccfa819a" ON "companies" ("industry") `);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(20), "mobile" character varying(20), "position" character varying(100), "orgId" integer NOT NULL, "leadSource" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastContactedAt" TIMESTAMP, "fullName" character varying(255), "companyId" integer, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_752866c5247ddd34fd05559537" ON "contacts" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_84cae51c485079bdd8cdf1d828" ON "contacts" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4809f4f9ad4a220959788def4" ON "contacts" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_f4809f4f9ad4a220959788def42" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_f4809f4f9ad4a220959788def42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4809f4f9ad4a220959788def4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84cae51c485079bdd8cdf1d828"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_752866c5247ddd34fd05559537"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d618bf519adc88b3eccfa819a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3dacbb3eb4f095e29372ff8e13"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
