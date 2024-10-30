import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserFacade } from "src/facade/user.facade";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  CreateUserBodySchema,
  createUserBodySchema,
} from "src/types/user-zod.types";

@Controller()
export class RegisterController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  @UsePipes(new ZodValidation(createUserBodySchema))
  public async handleCreateUser(
    @Body() body: CreateUserBodySchema
  ): Promise<void> {
    const { email, password } = body;
    await this.userFacade.createUser(email, password);
  }
}
