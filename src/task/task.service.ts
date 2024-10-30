import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Status } from "@prisma/client";
import { Task } from "src/entities/task.entitie";
import { TaskServiceInterface } from "src/interfaces/task-service.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskService implements TaskServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async updateStatusByTaskId(
    userId: string,
    taskId: number,
    status: Status
  ): Promise<void> {
    try {
      const task = await this.prismaService.task.findFirst({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new NotFoundException(
          `Tarefa de Id: ${taskId} não encontrada para o usuário de Id: ${userId}`
        );
      }

      await this.prismaService.task.update({
        where: { id: taskId, userId },
        data: {
          status,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar atualizar tarefa",
        error: { err },
      });
    }
  }

  public async createTask(
    userId: string,
    description: string,
    title: string,
    date_to_finish: Date,
    status: Status
  ): Promise<void> {
    try {
      await this.prismaService.task.create({
        data: {
          title,
          description,
          status,
          userId,
          date_to_finish,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar criar a tafera",
        error: { err },
      });
    }
  }

  public async deleteTask(userId: string, taskId: number): Promise<void> {
    try {
      const task = await this.prismaService.task.findFirst({
        where: {
          id: taskId,
          userId,
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Tarefa de Id: ${taskId} não encontrada para o usuário de Id: ${userId}`
        );
      }

      await this.prismaService.task.delete({ where: { id: taskId } });
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Erro ao tentar deletar as tarefas do usuário com id: ${userId}`,
        error: { err },
      });
    }
  }

  public async getTasksByUserId(userId: string): Promise<Task[]> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          task: true,
        },
      });

      if (!user) {
        throw new NotFoundException(
          `Usuário com id: ${userId} não encontrado.`
        );
      }

      return user.task;
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Erro ao buscar as tarefas do usuário com id: ${userId}`,
        error: { err },
      });
    }
  }

  public async getTaskById(
    userId: string,
    taskId: number
  ): Promise<Task | null> {
    try {
      const task = await this.prismaService.task.findFirst({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new NotFoundException(
          `Tarefa com id: ${taskId} não encontrada para o usuário com id: ${userId}`
        );
      }

      return task;
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Erro ao buscar a tarefa do usuário com id: ${userId}`,
        error: { err },
      });
    }
  }
}
