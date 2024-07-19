import { DTOPatient } from "../dto/patient.dto";
import { PatientRepository } from "../repository/patient.repository";
import { BaseService } from "./base.service";

export class PatientService extends BaseService {
  constructor(
    private patientRepository: PatientRepository = new PatientRepository(),
  ) {
    super(patientRepository);
  }

  async createPatient(input: DTOPatient) {
    return await this.patientRepository.createPatient(input);
  }

  async updatePatient(id: string, input: DTOPatient) {
    await this.patientRepository.updatePatient(id, input);
  }
}
