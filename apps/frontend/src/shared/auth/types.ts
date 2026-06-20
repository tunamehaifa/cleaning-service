export type UserRole = "admin" | "cleaner" | "user";

export type AuthUser = {
  name: string;
  role: UserRole;
};
