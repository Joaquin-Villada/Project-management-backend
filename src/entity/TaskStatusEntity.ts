import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../model/TaskModel";
import { TaskEntity } from "./TaskEntity";

@Entity({ name: "estados" })
export class TaskStatusEntity implements TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: "nombre" })
  name: string;

  @OneToMany(
    () => TaskEntity,
    (task: TaskEntity): TaskStatusEntity => task.status,
  )
  task: TaskEntity[];
}
