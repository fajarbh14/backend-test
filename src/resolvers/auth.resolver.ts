import { ApolloError } from "apollo-server";
import { AuthService } from "../services/auth.service";
import { DTOLogin, DTORegister } from "../dto/auth.dto";

const authService = new AuthService();

const AuthQuery = {};

const AuthMutation = {
  login: async (_: any, { input }: { input: DTOLogin }) => {
    try {
      const { email, password } = input;
      const response = await authService.login({ email, password });
      return response;
    } catch (error) {
      return new ApolloError(error.message, "400");
    }
  },

  register: async (_: any, { input }: { input: DTORegister }) => {
    try {
      const { email, password, confirmPassword, name } = input;
      const response = await authService.register({
        email,
        password,
        confirmPassword,
        name,
      });
      return "User registered successfully";
      // Do something
    } catch (error) {
      return new ApolloError(error.message, "400");
    }
  },
};

export { AuthQuery, AuthMutation };
