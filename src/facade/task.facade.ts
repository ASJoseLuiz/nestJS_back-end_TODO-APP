import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskService } from "../task/task.service";
import { Task } from "src/entities/task.entitie";
import { Status } from "@prisma/client";

@Injectable()
export class TaskFacade {
  constructor(private readonly taskService: TaskService) {}

  public async getTasksfromUserId(userId: string): Promise<Task[]> {
    const tasks = await this.taskService.getTasksByUserId(userId);

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(
        `Nenhuma tarefa encontrada para o usuário com id: ${userId}`
      );
    }

    return tasks;
  }

  public async createTask(
    userId: string,
    description: string,
    title: string,
    date_to_finish: Date
  ): Promise<void> {
    await this.taskService.createTask(
      userId,
      description,
      title,
      date_to_finish,
      Status.INITIALIZED
    );
  }

  public async deleteTask(userId: string, taskId: number): Promise<void> {
    await this.taskService.deleteTask(userId, taskId);
  }

  public async getTaskById(userId: string, taskId: number): Promise<Task> {
    return await this.taskService.getTaskById(userId, taskId);
  }
}
