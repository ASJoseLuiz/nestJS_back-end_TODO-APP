import { Task } from "@prisma/client";

export class User {
  public id: string;
  public email: string;
  public password: string;
  public task: Task[];
}
