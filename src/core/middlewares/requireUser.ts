import { AuthenticationError } from "apollo-server-express";
import { verifyJWT } from "../config/jwt";
const auth = (context: any, requireAuth = true) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyJWT(token);
    return decoded;
  }

  if (requireAuth) {
    throw new AuthenticationError("Login in to access resource");
  }

  return null;
};

export default auth;
