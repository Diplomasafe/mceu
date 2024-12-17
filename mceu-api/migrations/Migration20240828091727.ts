import { Migration } from '@mikro-orm/migrations';

export class Migration20240828091727 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "credentials" rename column "issuer_date" to "issue_date";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "credentials" rename column "issue_date" to "issuer_date";');
  }

}
