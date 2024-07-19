import { IsBoolean, IsEmpty, IsString } from "class-validator";

export class DTOAppointment {
  @IsString()
  @IsEmpty()
  patientId: string;

  @IsString()
  @IsEmpty()
  doctorId: string;

  @IsString()
  @IsEmpty()
  date: string;

  @IsString()
  @IsEmpty()
  reason: string;

  @IsString()
  @IsEmpty()
  notes: string;
}
