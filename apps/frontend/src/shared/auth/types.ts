import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "cleaner", "user"]);

export const authSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authUserSchema = z.object({
  email: z.email("Enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  role: userRoleSchema,
});

export type AuthFormValues = z.infer<typeof authSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
