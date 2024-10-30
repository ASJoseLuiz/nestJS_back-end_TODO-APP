import { User } from "src/entities/user.entitie";

export interface UserServiceInterface {
  createUser(email: string, password: string): Promise<void>;
  deleteUser(email: string, password: string): Promise<void>;
  getUserByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
}
