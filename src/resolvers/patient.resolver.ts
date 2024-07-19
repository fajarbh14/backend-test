import { DTOPatient } from "../dto/patient.dto";
import { PatientService } from "../services/patient.service";
import { ApolloError } from "apollo-server";
import auth from "../core/middlewares/requireUser";

const patientService = new PatientService();

const PatientQuery = {
  getAllPatients: async (
    _: any,
    args: any,
    {
      search,
      page,
      limit,
      req,
    }: { search: string; page: number; limit: number; req: any },
  ) => {
    try {
      const query = {
        search: search,
      };
      const options = {
        limit: limit || 10,
        page: page || 1,
      };
      const result = await patientService.findAndPaginate(query, options);
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },

  getByIdPatient: async (
    _: any,
    args: any,
    { id, req }: { id: string; req: any },
  ) => {
    try {
      const result = await patientService.findById(id);
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },
};

const PatientMutation = {
  createPatient: async (_: any, { input }: { input: DTOPatient }) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, contactInfo } = input;
      const result = await patientService.createPatient({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        contactInfo,
      });
      return result;
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },

  updatePatient: async (
    _: any,
    { id, input }: { id: string; input: DTOPatient },
  ) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, contactInfo } = input;
      await patientService.updatePatient(id, {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        contactInfo,
      });
      return "Patient updated successfully";
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },

  deletePatient: async (_: any, { id }: { id: string }) => {
    try {
      await patientService.destroy(id);
      return "Patient deleted successfully";
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
};

export { PatientQuery, PatientMutation };
