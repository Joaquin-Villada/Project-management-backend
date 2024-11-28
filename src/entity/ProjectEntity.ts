import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "../model/ProjectModel";
import { DeveloperEntity } from "./DeveloperEntity";
import { TaskEntity } from "./TaskEntity";

@Entity({ name: "proyectos" })
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;
  @Column({ name: "nombre" })
  name: string;
  @Column({ name: "descripcion" })
  description: string;
  @Column({ name: "fecha_inicio", type: "timestamp" })
  startDate: Date;
  @Column({ name: "fecha_fin", type: "date", nullable: true })
  endDate: Date | null;
  @Column({ name: "fecha_creacion", type: "timestamp" })
  creationDate: Date;
  @Column({ name: "fecha_actualizacion", type: "timestamp" })
  updateDate: Date;
  @Column({ name: "id_responsable" })
  idManager: number;
  @ManyToMany(
    () => DeveloperEntity,
    (developers: DeveloperEntity): ProjectEntity[] => developers.project,
  )
  developers: DeveloperEntity[];

  @OneToMany(
    () => TaskEntity,
    (task: TaskEntity): ProjectEntity => task.project,
  )
  task: TaskEntity[];

  /* @ManyToMany(() => TaskEntity, (task: TaskEntity) => task.idProject)
   @JoinTable({
     joinColumn: { name: "tareas_x_proyecto" },
   })
   task: TaskEntity[];*/
}
