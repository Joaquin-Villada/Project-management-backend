import { Task } from './../model/TaskModel';
import { Developer } from "../model/DeveloperModel";

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleEntity } from "./RoleEntity";
import { ProjectEntity } from "./ProjectEntity";
import { TaskEntity } from "./TaskEntity";

@Entity({ name: "desarrolladores" })
export class DeveloperEntity implements Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "correo" })
  mail: string;

  @Column({ name: "nombre" })
  name: string;

  @Column({ name: "fecha_contratacion", type: "timestamp" })
  startDate: Date;

  @Column({ name: "fecha_creacion", type: "timestamp" })
  creationDate: Date;

  @Column({ name: "fecha_actualizacion", type: "timestamp" })
  updateDate: Date;

  @ManyToOne(
    () => RoleEntity,
    (role: RoleEntity): DeveloperEntity => role.developer,
  )
  @JoinColumn({ name: "id_rol" })
  role: RoleEntity;

  @OneToMany(
    () => TaskEntity,
    (task: TaskEntity): DeveloperEntity => task.developer,
  )
  task: TaskEntity;

  @ManyToMany(
    () => ProjectEntity,
    (project: ProjectEntity): DeveloperEntity[] => project.developers,
  )
  @JoinTable({
    name: "desarrollador_x_proyecto",
    joinColumn: {
      name: "id_desarrollador",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_proyecto",
      referencedColumnName: "id",
    },
  })
  project: ProjectEntity[];
}
