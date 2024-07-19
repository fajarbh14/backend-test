import { BaseService } from "./base.service";
import { DoctorRepository } from "../repository/doctor.repository";
import { DTODoctor } from "../dto/doctor.dto";
export class DoctorService extends BaseService {
  constructor(
    private doctorRepository: DoctorRepository = new DoctorRepository(),
  ) {
    super(doctorRepository);
  }

  async createDoctor(input: DTODoctor) {
    return this.doctorRepository.create(input);
  }

  async updateDoctor(id: string, input: DTODoctor) {
    return this.doctorRepository.update(id, input);
  }
}
