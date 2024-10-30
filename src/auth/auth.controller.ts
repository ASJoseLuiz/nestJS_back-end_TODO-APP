import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { Response } from "express";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import { LoginBodySchema, loginBodySchema } from "src/types/user-zod.types";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidation(loginBodySchema))
  public async handleLogin(
    @Body() body: LoginBodySchema,
    @Res() response: Response
  ): Promise<void> {
    const { email, password } = body;
    const tokenData = await this.authService.validation(email, password);

    response.json({
      message: "Login bem-sucedido",
      token: tokenData.token,
    });
  }
}
