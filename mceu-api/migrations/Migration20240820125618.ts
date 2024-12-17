import { Migration } from '@mikro-orm/migrations';

export class Migration20240820125618 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "credentials" add column "country" varchar(255) not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "credentials" drop column "country";');
  }

}
