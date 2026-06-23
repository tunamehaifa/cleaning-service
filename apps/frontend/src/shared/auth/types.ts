import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "cleaner", "user"]);

export const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  roles: z.array(userRoleSchema),
});

export type AuthFormValues = z.infer<typeof authSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
