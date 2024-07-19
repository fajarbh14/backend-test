import { IsString, IsNotEmpty, IsObject } from "class-validator";

export class DTODoctor {
  @IsString()
  @IsNotEmpty()
  name: string;
}
