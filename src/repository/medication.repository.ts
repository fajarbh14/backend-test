import { Medication } from "../entity/medication.entity";
import { Database } from "../core/config/database";
import { DTOMedication } from "../dto/medication.dto";
import { Repository } from "typeorm";

export class MedicationRepository {
  private medicationRepository: Repository<Medication>;

  constructor() {
    this.medicationRepository = Database.getRepository(Medication);
  }

  async findAndPaginate(
    query: Record<string, string>,
    options: Record<string, number>,
  ) {
    const paginate = {
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    };

    const [medications, total] = await this.medicationRepository.findAndCount({
      ...paginate,
    });
    return {
      medications,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findById(id: string) {
    return this.medicationRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createMedication(input: DTOMedication) {
    const medication = await this.medicationRepository.save(input);
    return medication;
  }

  async updateMedication(id: string, input: DTOMedication) {
    await this.medicationRepository.update(
      {
        id: id,
      },
      input,
    );
  }
}
