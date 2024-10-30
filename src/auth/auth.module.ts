import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "src/guards/authentication.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { EnvSchema } from "src/types/env-zod.types";

@Module({
  providers: [AuthService, JwtService, PrismaService, ConfigService, AuthGuard],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvSchema, true>) => {
        return {
          secret: configService.get<string>("JWT_PRIVATE_KEY"),
          signOptions: { expiresIn: "60m" },
        };
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
