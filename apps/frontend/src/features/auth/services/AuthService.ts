import type { AuthFormValues, AuthUser } from "shared/auth/types";

export interface AuthService {
  login(values: AuthFormValues): Promise<AuthUser>;
  getToken(): string | null;
}
