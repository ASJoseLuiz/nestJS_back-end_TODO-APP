import { Status } from "@prisma/client";

export class Task {
  public id: number;
  public userId: string;
  public description: string;
  public createdAt: Date;
  public status: Status;
}
