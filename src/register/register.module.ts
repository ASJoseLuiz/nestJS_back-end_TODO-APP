import { Module } from "@nestjs/common";
import { RegisterController } from "./register.controller";
import { UserService } from "src/user/user.service";
import { UserFacade } from "src/facade/user.facade";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [RegisterController],
  providers: [UserService, UserFacade, PrismaService],
})
export class RegisterModule {}
