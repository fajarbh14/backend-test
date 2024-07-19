import { ApolloError } from "apollo-server";
import { AppointmentService } from "../services/appointment.service";
import { DTOAppointment } from "../dto/appoinment.dto";

const appointmentService = new AppointmentService();

const AppointmentQuery = {
  getAllAppointments: async (
    _: any,
    { search, page, limit }: { search: string; page: number; limit: number },
  ) => {
    try {
      const query = {
        search: search,
      };
      const options = {
        limit: limit || 10,
        page: page || 1,
      };
      return await appointmentService.findAndPaginate(query, options);
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },
};

const AppointmentMutation = {
  createAppointment: async (_: any, { input }: { input: DTOAppointment }) => {
    try {
      const { doctorId, patientId, date, reason, notes } = input;
      const result = await appointmentService.createAppointment({
        doctorId,
        patientId,
        date,
        reason,
        notes,
      });
      return result;
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
  disableAppointment: async (_: any, { id }: { id: string }) => {
    try {
      const result = await appointmentService.disableAppointment(id);
      return result;
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
  updateAppointment: async (
    _: any,
    { id, input }: { id: string; input: DTOAppointment },
  ) => {
    try {
      const { doctorId, patientId, date, reason, notes } = input;
      await appointmentService.updateAppointment(id, {
        doctorId,
        patientId,
        date,
        reason,
        notes,
      });
      return "Appointment updated";
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
  deleteAppointment: async (_: any, { id }: { id: string }) => {
    try {
      const result = await appointmentService.destroy(id);
      return result;
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
};

export { AppointmentQuery, AppointmentMutation };
