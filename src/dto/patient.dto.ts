import { IsString, IsNotEmpty, IsObject } from "class-validator";

export class DTOPatient {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsObject()
  @IsNotEmpty()
  contactInfo: {
    phone: string;
    email: string;
  };
}
