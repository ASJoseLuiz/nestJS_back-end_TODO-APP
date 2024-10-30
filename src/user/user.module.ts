import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserFacade } from "src/facade/user.facade";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";

@Module({
  providers: [
    UserService,
    PrismaService,
    UserFacade,
    JwtService,
    ConfigService,
    AuthService,
  ],
  controllers: [UserController],
})
export class UserModule {}
