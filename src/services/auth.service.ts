import { DTORegister, DTOLogin } from "../dto/auth.dto";
import { UserRepository } from "../repository/user.repository";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";
import { signJWT, verifyJWT } from "../core/config/jwt";

export class AuthService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  private hashData(data: string) {
    const keyHash = 10;
    return hash(data, keyHash);
  }

  private comparePassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async login(input: DTOLogin) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
    }

    const isPasswordValid = await this.comparePassword(
      input.password,
      user.password,
    );
    if (!isPasswordValid) {
    }

    // Create JWT
    let tokenPayload: any = { id: user.id, email: user.email, role: user.role };
    const accessToken = signJWT(tokenPayload, "30m");
    const refreshToken = signJWT(tokenPayload, "1d");

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(input: DTORegister) {
    const user = await this.userRepository.findByEmail(input.email);

    if (user) {
    }

    const hashPassword = await this.hashData(input.password);

    // Create User
    const newUser = await this.userRepository.create({
      email: input.email,
      name: input.name,
      password: hashPassword,
    });
    return newUser;
  }
}
