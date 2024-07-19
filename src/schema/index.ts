import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getAllPatients(search: String, page: Int, limit: Int): PatientPage!
    getByIdPatient(id: ID!): Patient!

    getAllDoctors(search: String, page: Int, limit: Int): DoctorPage!
    getByIdDoctor(id: ID!): Doctor!

    getAllAppointments(search: String, page: Int, limit: Int): AppointmentPage!
    getByIdAppointment(id: ID!): Appointment!

    getAllMedicalHistories(
      search: String
      page: Int
      limit: Int
    ): MedicalHistoryPage!
    getByIdMedicalHistory(id: ID!): MedicalHistory!

    getAllMedications(search: String, page: Int, limit: Int): MedicationPage!
    getByIdMedication(id: ID!): Medication!
  }

  type MedicationPage {
    medications: [Medication]!
    total: Int!
    limit: Int!
    page: Int!
  }

  type PatientPage {
    patients: [Patient]!
    total: Int!
    limit: Int!
    page: Int!
  }

  type DoctorPage {
    doctors: [Doctor]!
    total: Int!
    limit: Int!
    page: Int!
  }

  type AppointmentPage {
    appointments: [Appointment]!
    total: Int!
    limit: Int!
    page: Int!
  }

  type MedicalHistoryPage {
    medicalHistories: [MedicalHistory]!
    total: Int!
    limit: Int!
    page: Int!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    refreshToken: String!
    password: String!
    isVerified: Boolean!
    role: String!
  }

  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    gender: String!
    contactInfo: ContactInfo!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    appointments: [Appointment]!
    medicalHistory: [MedicalHistory]!
    medications: [Medication]!
  }

  type ContactInfo {
    phone: String!
    email: String!
  }

  type Appointment {
    id: ID!
    patient: Patient!
    date: String!
    doctor: Doctor!
    reason: String!
    notes: String
    isActive: Boolean!
  }

  type Doctor {
    id: ID!
    name: String!
  }

  type MedicalHistory {
    id: ID!
    patient: Patient!
    condition: String!
    diagnosisDate: String!
    status: String!
  }

  type Medication {
    id: ID!
    name: String!
    dosage: String!
    frequency: String!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }

  input ContactInfoInput {
    phone: String!
    email: String!
  }

  input CreatePatientInput {
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    gender: String!
    contactInfo: ContactInfoInput!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateDoctorInput {
    name: String!
  }

  input CreateAppointmentInput {
    patientId: ID!
    date: String!
    doctorId: ID!
    reason: String!
    notes: String
  }

  input CreateMedicalHistoryInput {
    patientId: ID!
    condition: String!
    diagnosisDate: String!
    status: String!
  }

  input CreateMedicationInput {
    patientId: ID!
    name: String!
    dosage: String!
    frequency: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload
    register(input: RegisterInput!): String

    createDoctor(input: CreateDoctorInput!): Doctor
    updateDoctor(id: ID!, input: CreateDoctorInput!): String
    deleteDoctor(id: ID!): String

    createPatient(input: CreatePatientInput!): Patient
    updatePatient(id: ID!, input: CreatePatientInput!): String
    deletePatient(id: ID!): String

    createAppointment(input: CreateAppointmentInput!): Appointment
    updateAppointment(id: ID!, input: CreateAppointmentInput!): String
    deleteAppointment(id: ID!): String
    disableAppointment(id: ID!): String

    createMedicalHistory(input: CreateMedicalHistoryInput!): MedicalHistory
    updateMedicalHistory(id: ID!, input: CreateMedicalHistoryInput!): String
    deleteMedicalHistory(id: ID!): String

    createMedication(input: CreateMedicationInput!): Medication
    updateMedication(id: ID!, input: CreateMedicationInput!): String
    deleteMedication(id: ID!): String
  }
`;

export default typeDefs;
