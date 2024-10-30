import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RouterModule } from "@nestjs/core";
import { RegisterModule } from "./register/register.module";

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: "register",
        module: RegisterModule,
      },
      {
        path: "login",
        module: AuthModule,
        children: [
          {
            path: "task",
            module: TaskModule,
          },
          {
            path: "user",
            module: UserModule,
          },
        ],
      },
    ]),
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
