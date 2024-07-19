import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Appointment } from "./appointment.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "doctors" })
export class Doctor extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
