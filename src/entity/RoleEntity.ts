import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../model/RoleModel";
import { DeveloperEntity } from "./DeveloperEntity";

@Entity({ name: "roles" })
export class RoleEntity implements Role {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "nombre" })
  name: string;

  @OneToMany(
    () => DeveloperEntity,
    (developer: DeveloperEntity): RoleEntity => developer.role,
  )
  developer: DeveloperEntity;
}
