import { MigrationInterface, QueryRunner } from 'typeorm';

export class numberToDecimal1717696617367 implements MigrationInterface {
  name = 'numberToDecimal1717696617367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD "valor_total" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "valor" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" DROP COLUMN "preco_venda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" ADD "preco_venda" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" DROP COLUMN "preco_venda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" ADD "preco_venda" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "valor" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD "valor_total" integer NOT NULL`,
    );
  }
}
