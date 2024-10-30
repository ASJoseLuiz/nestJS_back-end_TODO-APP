import { Status } from "@prisma/client";
import { Task } from "../entities/task.entitie";

export interface TaskServiceInterface {
  createTask(
    userId: string,
    description: string,
    title: string,
    date_to_finish: Date,
    status: Status
  ): Promise<void>;
  deleteTask(userId: string, taskId: number): Promise<void>;
  getTasksByUserId(userId: string): Promise<Task[]>;
  getTaskById(userId: string, taskId: number): Promise<Task | null>;
  updateStatusByTaskId(
    userId: string,
    taskId: number,
    status: Status
  ): Promise<void>;
}
