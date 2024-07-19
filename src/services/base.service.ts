import { ApolloError } from "apollo-server";

export class BaseService {
  private readonly repository;
  constructor(repository: any) {
    this.repository = repository;
  }

  async findAndPaginate(
    query: Record<string, string>,
    options: Record<string, number>,
  ) {
    const findAndPaginate = await this.repository.findAndPaginate(
      query,
      options,
    );
    return findAndPaginate;
  }

  async findById(id: string) {
    const checkData = await this.repository.findById(id);
    if (!checkData) throw new ApolloError("Data not found", "404");
    return checkData;
  }

  async destroy(id: string) {
    const checkData = await this.repository.findById(id);
    if (!checkData) throw new ApolloError("Data not found", "404");
    await this.repository.delete(id);
    return "Data deleted successfully";
  }
}
