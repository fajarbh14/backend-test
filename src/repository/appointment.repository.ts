import { Appointment } from "../entity/appointment.entity";
import { Database } from "../core/config/database";
import { DTOAppointment } from "../dto/appoinment.dto";
import { Repository } from "typeorm"; // Add this import statement

export class AppointmentRepository {
  private appointmentRepository: Repository<Appointment>;
  constructor() {
    this.appointmentRepository = Database.getRepository(Appointment);
  }

  async findAndPaginate(options: Record<string, number>) {
    const paginate = {
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    };

    const [appointments, total] = await this.appointmentRepository.findAndCount(
      {
        ...paginate,
        relations: ["doctor", "patient"],
      },
    );
    return {
      appointments,
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findById(id: string) {
    return this.appointmentRepository.findOneBy({ id });
  }

  async delete(id: string) {
    await this.appointmentRepository.delete({
      id: id,
    });
  }

  async createAppointment(data: DTOAppointment) {
    const appointment = await this.appointmentRepository.save({
      ...data,
      isActive: true,
    });
    return appointment;
  }

  async disableAppointment(id: string) {
    const appointment = await this.appointmentRepository.findOneBy({
      id: id,
    });
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    appointment.isActive = false;
    await this.appointmentRepository.save(appointment);
    return appointment;
  }

  async updateAppointment(id: string, input: DTOAppointment) {
    await this.appointmentRepository.update(id, input);
  }
}
