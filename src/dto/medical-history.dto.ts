import { IsString, IsEmpty, IsDate } from "class-validator";

export class DTOMedicalHistory {
  @IsString()
  @IsEmpty()
  condition: string;

  @IsString()
  @IsEmpty()
  patientId: string;

  @IsDate()
  @IsEmpty()
  diagnosisDate: string;

  @IsString()
  @IsEmpty()
  status: string;
}
