import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "../model/TaskModel";
import { DeveloperEntity } from "./DeveloperEntity";
import { TaskStatusEntity } from "./TaskStatusEntity";
import { ProjectEntity } from "./ProjectEntity";

@Entity({ name: "tareas" })
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "titulo" })
  tittle: string;

  @Column({ name: "descripcion" })
  description: string;

  @Column({ name: "fecha_limite", type: "timestamp", nullable: true })
  limitDate: Date | null;

  @Column({ name: "fecha_creacion", type: "timestamp" })
  creationDate: Date;

  @Column({ name: "fecha_actualizacion", type: "timestamp" })
  updateDate: Date;

  @ManyToOne(
    () => TaskStatusEntity,
    (status: TaskStatusEntity): TaskEntity[] => status.task
  )
  @JoinColumn({ name: "id_estado" })
  status: TaskStatusEntity;

  @ManyToOne(
    () => ProjectEntity,
    (project: ProjectEntity): TaskEntity[] => project.task
  )
  @JoinColumn({ name: "id_proyecto" })
  project: ProjectEntity;

  @ManyToOne(
    () => DeveloperEntity,
    (developer: DeveloperEntity): TaskEntity => developer.task
  )
  @JoinColumn({ name: "id_asignado" })
  developer: DeveloperEntity;
}
