import { Entity, Column, OneToMany } from "typeorm";

import { Appointment } from "./appointment.entity";
import { MedicalHistory } from "./medical-history.entity";
import { Medication } from "./medication.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "patients" })
export class Patient extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column("simple-json")
  contactInfo: {
    phone: string;
    email: string;
  };

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory: MedicalHistory[];

  @OneToMany(() => Medication, (medication) => medication.patient)
  medications: Medication[];
}
