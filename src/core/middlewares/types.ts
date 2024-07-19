export interface JWTTokenPayload {
  id: string;
  email: string;
  name: string;
  refreshToken: string;
  role: string;
}
