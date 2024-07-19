import { ApolloError } from "apollo-server";
import { MedicationService } from "../services/medication.service";
import { DTOMedication } from "../dto/medication.dto";

const medicationService = new MedicationService();

const MedicationQuery = {
  getAllMedications: async (
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
      const result = await medicationService.findAndPaginate(query, options);
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },

  getByIdMedication: async (_: any, { id }: { id: string }) => {
    try {
      const result = await medicationService.findById(id);
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },
};

const MedicationMutation = {
  createMedication: async (_, { input }: { input: DTOMedication }) => {
    try {
      const { name, dosage, frequency, patientId } = input;
      const result = await medicationService.createMedication({
        name,
        patientId,
        dosage,
        frequency,
      });
      return result;
    } catch (error) {
      return new ApolloError(error.message, "400");
    }
  },

  updateMedication: async (
    _,
    { id, input }: { id: string; input: DTOMedication },
  ) => {
    try {
      const { name, dosage, frequency, patientId } = input;
      await medicationService.updateMedication(id, {
        name,
        patientId,
        dosage,
        frequency,
      });
      return "Medication updated successfully";
    } catch (error) {
      return new ApolloError(error.message, "400");
    }
  },
};

export { MedicationQuery, MedicationMutation };
