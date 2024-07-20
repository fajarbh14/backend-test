import { MedicalHistory } from "../entity/medical-history.entity";
import { Database } from "../core/config/database";
import { Repository } from "typeorm";
export class MedicalHistoryRepository {
  private medicalHistoryRepository: Repository<MedicalHistory>;

  constructor() {
    this.medicalHistoryRepository = Database.getRepository(MedicalHistory);
  }

  async createMedicalHistory(input: any) {
    const medicalHistory = await this.medicalHistoryRepository.save(input);
    return medicalHistory;
  }

  async findAndPaginate(
    query: Record<string, string>,
    options: Record<string, number>,
  ) {
    const condition = {
      where: {
        name: query.search,
      },
    };
    const paginate = {
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    };

    const [medicalHistories, total] =
      await this.medicalHistoryRepository.findAndCount({
        ...paginate,
        relations: ["patient"],
      });

    return {
      medicalHistories,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findById(id: string) {
    const medicalHistory = await this.medicalHistoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ["patient"],
    });
    if (!medicalHistory) {
      throw new Error("Medical history not found");
    }
    return medicalHistory;
  }

  async updateMedicalHistory(id: string, input: any) {
    await this.medicalHistoryRepository.update(
      {
        id: id,
      },
      input,
    );
  }

  async delete(id: string) {
    await this.medicalHistoryRepository.delete({
      id: id,
    });
  }
}
