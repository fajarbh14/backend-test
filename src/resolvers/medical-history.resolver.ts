import { DTOMedicalHistory } from "../dto/medical-history.dto";
import { MedicalHistoryService } from "../services/medical-history.service";
import { ApolloError } from "apollo-server";

const medicalHistoryService = new MedicalHistoryService();

const MedicalHistoryQuery = {
  getAllMedicalHistories: async (
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
      const result = await medicalHistoryService.findAndPaginate(
        query,
        options,
      );
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },

  getByIdMedicalHistory: async (_: any, { id }: { id: string }) => {
    try {
      const result = await medicalHistoryService.findById(id);
      return result;
    } catch (error: any) {
      return new ApolloError(error.message, "400");
    }
  },
};

const MedicalHistoryMutation = {
  createMedicalHistory: async (
    _: any,
    { input }: { input: DTOMedicalHistory },
  ) => {
    try {
      const { patientId, condition, diagnosisDate, status } = input;
      const result = await medicalHistoryService.createMedicalHistory({
        patientId,
        condition,
        diagnosisDate,
        status,
      });
      return result;
    } catch (error) {
      return new ApolloError(error.message, "400");
    }
  },
};

export { MedicalHistoryQuery, MedicalHistoryMutation };
