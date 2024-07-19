import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Patient } from "./patient.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "medical_history" })
export class MedicalHistory extends BaseEntity {
  @Column()
  condition: string;

  @Column("date")
  diagnosisDate: string;

  @Column()
  status: string;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
  patient: Patient;
}
