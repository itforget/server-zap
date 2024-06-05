import { MigrationInterface, QueryRunner } from "typeorm";

export class valorToDecimal1717614129209 implements MigrationInterface {
    name = 'valorToDecimal1717614129209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" integer NOT NULL`);
    }

}
