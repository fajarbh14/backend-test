import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  isVerified: boolean;

  @Column("enum", { enum: ["user", "admin"], default: "admin" })
  role: string;
}
