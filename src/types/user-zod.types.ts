import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export const deleteUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>;

export type LoginBodySchema = z.infer<typeof loginBodySchema>;
