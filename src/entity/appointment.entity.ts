import { Entity, Column, ManyToOne } from "typeorm";

import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "appointments" })
export class Appointment extends BaseEntity {
  @Column()
  date: string;

  @Column()
  reason: string;

  @Column()
  notes: string;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;
}
