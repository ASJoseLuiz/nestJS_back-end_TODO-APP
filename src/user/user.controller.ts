import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UserFacade } from "src/facade/user.facade";
import { User } from "src/entities/user.entitie";
import { AuthGuard } from "src/guards/authentication.guard";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  DeleteUserBodySchema,
  deleteUserBodySchema,
} from "src/types/user-zod.types";

@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  public async handleGetUser(@Request() req): Promise<User> {
    const email = req.user.email;
    return await this.userFacade.getUserByEmail(email);
  }

  @Delete()
  @UsePipes(new ZodValidation(deleteUserBodySchema))
  public async handleDeleteUser(
    @Body() body: DeleteUserBodySchema
  ): Promise<void> {
    const { email, password } = body;
    await this.userFacade.deleteUserByEmail(email, password);
  }
}
