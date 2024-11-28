import {
  IsEmail,
  IsString,
  ValidateNested,
} from "class-validator";

export class UpdateDevDto {
  @IsString({ message: "El nombre debe ser un texto." })
  mail: string;

  @IsEmail({}, { message: "El correo debe ser un formato de correo válido." })
  name: string;

  @ValidateNested()
  idRole: number;
}
