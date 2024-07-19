import { DTODoctor } from "../dto/doctor.dto";
import { DoctorService } from "../services/doctor.service";
import { ApolloError } from "apollo-server";

const doctorService = new DoctorService();

const DoctorQuery = {
  getAllDoctors: async (
    _,
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
      const result = await doctorService.findAndPaginate(query, options);
      return result;
    } catch (error: any) {
      throw new ApolloError(error.message, "400");
    }
  },

  getByIdDoctor: async (_: any, { id }: { id: string }) => {
    try {
      const result = await doctorService.findById(id);
      return result;
    } catch (error: any) {
      throw new ApolloError(error.message, "400");
    }
  },
};

const DoctorMutation = {
  createDoctor: async (_: any, { input }: { input: DTODoctor }) => {
    try {
      const { name } = input;
      const result = await doctorService.createDoctor({
        name,
      });
      return result;
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },

  updateDoctor: async (
    _: any,
    { id, input }: { id: string; input: DTODoctor },
  ) => {
    try {
      const { name } = input;
      await doctorService.updateDoctor(id, {
        name,
      });
      return "Doctor updated successfully";
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },

  deleteDoctor: async (_: any, { id }: { id: string }) => {
    try {
      await doctorService.destroy(id);
      return "Doctor deleted successfully";
    } catch (error) {
      throw new ApolloError(error.message, "400");
    }
  },
};

export { DoctorQuery, DoctorMutation };
