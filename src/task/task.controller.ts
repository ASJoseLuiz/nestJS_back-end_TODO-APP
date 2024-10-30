import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/authentication.guard";
import { Task } from "src/entities/task.entitie";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  CreateTaskBodySchema,
  createTaskBodySchema,
} from "src/types/task-zod.types";
import { TaskFacade } from "src/facade/task.facade";

@UseGuards(AuthGuard)
@Controller()
export class TaskController {
  constructor(private readonly taskFacade: TaskFacade) {}

  @Get()
  public async handlegetTasks(@Request() req): Promise<Task[]> {
    const userId = req.user.sub;
    return await this.taskFacade.getTasksfromUserId(userId);
  }

  @Post()
  @UsePipes(new ZodValidation(createTaskBodySchema))
  public async handleCreateTask(
    @Body() body: CreateTaskBodySchema,
    @Request() req
  ): Promise<void> {
    const userId = req.user.sub;
    const { title, description, date_to_finish } = body;
    await this.taskFacade.createTask(
      userId,
      description,
      title,
      date_to_finish
    );
  }

  @Delete(":taskId")
  public async handleDeleteTask(
    @Param("taskId") taskId: string,
    @Request() req
  ): Promise<void> {
    const userId = req.user.sub;
    await this.taskFacade.deleteTask(userId, parseInt(taskId));
  }

  @Get(":taskId")
  public async handleGetTaskById(
    @Param("taskId") taskId: string,
    @Request() req
  ): Promise<Task> {
    const userId = req.user.sub;
    return await this.taskFacade.getTaskById(userId, parseInt(taskId));
  }
}
