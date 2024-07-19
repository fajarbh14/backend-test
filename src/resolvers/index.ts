import { PatientQuery, PatientMutation } from "./patient.resolver";
import { DoctorQuery, DoctorMutation } from "./doctor.resolver";
import { AuthQuery, AuthMutation } from "./auth.resolver";
import { AppointmentQuery, AppointmentMutation } from "./appointment.resolver";
import {
  MedicalHistoryQuery,
  MedicalHistoryMutation,
} from "./medical-history.resolver";
import { MedicationMutation, MedicationQuery } from "./medication.resolver";
const Resolvers = {
  Query: {
    ...PatientQuery,
    ...DoctorQuery,
    ...AppointmentQuery,
    ...MedicalHistoryQuery,
    ...MedicationQuery,
  },
  Mutation: {
    ...PatientMutation,
    ...DoctorMutation,
    ...AppointmentMutation,
    ...MedicalHistoryMutation,
    ...MedicationMutation,
    ...AuthMutation,
  },
};

export default Resolvers;
