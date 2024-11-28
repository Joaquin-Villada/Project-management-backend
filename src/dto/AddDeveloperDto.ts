import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

import { RoleEntity } from "../entity/RoleEntity";

export class AddDeveloperDto {
  @IsString()
  name: string;
  @IsEmail()
  mail: string;

  @IsNumber()
  idRole: number;

  @IsDate()
  startDate: Date;
}
