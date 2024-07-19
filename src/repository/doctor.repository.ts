import { Repository } from "typeorm";
import { Database } from "../core/config/database";
import { Doctor } from "../entity/doctor.entity";
export class DoctorRepository {
  private doctorRepository: Repository<Doctor>;
  constructor() {
    this.doctorRepository = Database.getRepository(Doctor);
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

    const [doctors, total] = await this.doctorRepository.findAndCount({
      ...condition,
      ...paginate,
    });

    return {
      doctors,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findById(id: string) {
    return this.doctorRepository.findOneBy({ id });
  }

  async create(data: Partial<Doctor>) {
    return this.doctorRepository.save(data);
  }

  async update(id: string, data: Partial<Doctor>) {
    return this.doctorRepository.update({ id }, data);
  }

  async delete(id: string) {
    return this.doctorRepository.delete({ id });
  }
}
