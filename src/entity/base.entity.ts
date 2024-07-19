import { PrimaryGeneratedColumn, Column } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column("timestamp", { nullable: true })
  deletedAt: Date;
}
