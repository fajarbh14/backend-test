import { BaseService } from "./base.service";

import { MedicalHistoryRepository } from "../repository/medical-history.repository";
import { DTOMedicalHistory } from "../dto/medical-history.dto";
export class MedicalHistoryService extends BaseService {
  constructor(
    private medicalHistoryRepository: MedicalHistoryRepository = new MedicalHistoryRepository(),
  ) {
    super(medicalHistoryRepository);
  }

  async createMedicalHistory(input: DTOMedicalHistory) {
    return this.medicalHistoryRepository.createMedicalHistory(input);
  }
}
