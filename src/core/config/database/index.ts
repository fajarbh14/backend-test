import "reflect-metadata";
import { DataSource } from "typeorm";
import { Patient } from "../../../entity/patient.entity";
import { Appointment } from "../../../entity/appointment.entity";
import { Doctor } from "../../../entity/doctor.entity";
import { Medication } from "../../../entity/medication.entity";
import { MedicalHistory } from "../../../entity/medical-history.entity";
import { User } from "../../../entity/user.entity";

require("dotenv").config();

export const Database = new DataSource({
  url: process.env.DATABASE_URL,
  type: "postgres",
  entities: [Patient, Appointment, Doctor, Medication, MedicalHistory, User],
  logging: false,
  synchronize: true,
});

export default Database;
