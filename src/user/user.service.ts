import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { compareSync, hash } from "bcrypt";
import { User } from "src/entities/user.entitie";
import { UserServiceInterface } from "src/interfaces/user-service.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(email: string, password: string): Promise<void> {
    try {
      const verifyUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (verifyUser) {
        throw new ConflictException("Usuário já existente");
      }

      const hashedPassword = await hash(password, 8);

      await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar criar usuário",
        error: err,
      });
    }
  }

  public async deleteUser(email: string, password: string): Promise<void> {
    try {
      const user = await this.getUserByEmail(email);

      if (!user || !compareSync(password, user.password)) {
        throw new UnauthorizedException("Email ou Senha inválidos");
      }

      await this.prismaService.user.delete({
        where: { email },
        include: { task: true },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao deletar usuário",
        error: err,
      });
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: { task: true },
      });

      if (!user) {
        throw new NotFoundException("Usuário não encontrado");
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao buscar usuário",
        error: err,
      });
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany({
        include: { task: true },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao buscar usuários",
        error: err,
      });
    }
  }
}
