import { Database } from "../core/config/database";
import { Patient } from "../entity/patient.entity";
import { DTOPatient } from "../dto/patient.dto";
import { Repository } from "typeorm";
export class PatientRepository {
  private patientRepository: Repository<Patient>;

  constructor() {
    this.patientRepository = Database.getRepository(Patient);
  }

  async findAndPaginate(
    query: Record<string, string>,
    options: Record<string, number>,
  ) {
    const condition = {
      where: {
        firstName: query.search,
      },
    };
    const paginate = {
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    };

    const [patients, total] = await this.patientRepository.findAndCount({
      ...condition,
      ...paginate,
      relations: ["appointments", "medications", "medicalHistory"],
    });

    return {
      patients,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findById(id: string) {
    const patient = await this.patientRepository.findOne({
      where: {
        id: id,
      },
      relations: ["appointments", "medications", "medicalHistory"],
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    return {
      ...patient,
      dateOfBirth: new Date(patient.dateOfBirth).toISOString(),
    };
  }

  async createPatient(input: DTOPatient) {
    const patient = await this.patientRepository.save(input);
    return patient;
  }

  async updatePatient(id: string, input: DTOPatient) {
    await this.patientRepository.update(
      {
        id: id,
      },
      input,
    );
  }

  async delete(id: string) {
    await this.patientRepository.delete({
      id: id,
    });
  }
}
