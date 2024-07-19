import { IsString, IsEmpty } from "class-validator";

export class DTOMedication {
  @IsString()
  @IsEmpty()
  name: string;

  @IsString()
  @IsEmpty()
  dosage: string;

  @IsString()
  @IsEmpty()
  frequency: string;

  @IsString()
  @IsEmpty()
  patientId: string;
}
