import { MedicationRepository } from "../repository/medication.repository";
import { BaseService } from "./base.service";
import { DTOMedication } from "../dto/medication.dto";
export class MedicationService extends BaseService {
  constructor(
    private medicationRepository: MedicationRepository = new MedicationRepository(),
  ) {
    super(medicationRepository);
  }

  async createMedication(input: DTOMedication) {
    return await this.medicationRepository.createMedication(input);
  }

  async updateMedication(id: string, input: DTOMedication) {
    await this.medicationRepository.updateMedication(id, input);
  }
}
