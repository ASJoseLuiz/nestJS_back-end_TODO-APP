import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entitie";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  public async createUser(email: string, password: string): Promise<void> {
    await this.userService.createUser(email, password);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }

  public async deleteUserByEmail(
    email: string,
    password: string
  ): Promise<void> {
    return await this.userService.deleteUser(email, password);
  }
}
