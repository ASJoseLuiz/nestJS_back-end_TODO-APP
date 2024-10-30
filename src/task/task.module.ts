import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TaskFacade } from "src/facade/task.facade";

@Module({
  providers: [
    TaskService,
    PrismaService,
    JwtService,
    ConfigService,
    TaskFacade,
  ],
  controllers: [TaskController],
})
export class TaskModule {}
