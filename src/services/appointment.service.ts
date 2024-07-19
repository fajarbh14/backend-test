import { DTOAppointment } from "../dto/appoinment.dto";
import { AppointmentRepository } from "../repository/appointment.repository";
import { BaseService } from "./base.service";

export class AppointmentService extends BaseService {
  constructor(
    private appointmentRepository: AppointmentRepository = new AppointmentRepository(),
  ) {
    super(appointmentRepository);
  }

  async createAppointment(input: DTOAppointment) {
    return await this.appointmentRepository.createAppointment(input);
  }

  async updateAppointment(id: string, input: DTOAppointment) {
    await this.appointmentRepository.updateAppointment(id, input);
  }

  async disableAppointment(id: string) {
    await this.appointmentRepository.disableAppointment(id);
    return "Appointment disabled";
  }
}
