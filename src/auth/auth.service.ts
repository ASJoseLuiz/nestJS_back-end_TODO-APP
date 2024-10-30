import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { compareSync } from "bcrypt";
import { TOKEN } from "./token.dto";
import { PayloadSchema } from "src/types/auth-zod.types";

@Injectable()
export class AuthService {
  private key: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.key = this.configService.get<string>("JWT_PRIVATE_KEY");
  }

  public async validation(email: string, password: string): Promise<TOKEN> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException("Email ou Senha inválidos");
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.generateToken(payload);
    return token;
  }

  private async generateToken(payload: PayloadSchema): Promise<TOKEN> {
    return {
      token: this.jwtService.sign(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          secret: this.key,
          expiresIn: "60m",
        }
      ),
    };
  }
}
