import { Database } from "../core/config/database";
import { User } from "../entity/user.entity";

export class UserRepository {
  constructor(private userRepository = Database.getRepository(User)) {
    this.userRepository = Database.getRepository(User);
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create(data: Partial<User>) {
    return this.userRepository.save(data);
  }
}
