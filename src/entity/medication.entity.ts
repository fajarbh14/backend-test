import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Patient } from "./patient.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "medications" })
export class Medication extends BaseEntity {
  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.medications)
  patient: Patient;
}
