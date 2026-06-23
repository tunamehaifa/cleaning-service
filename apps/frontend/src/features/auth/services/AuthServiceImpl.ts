import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { authConfig } from "features/auth/config/authConfig";
import type { AuthService } from "features/auth/services/AuthService";
import {
  authUserSchema,
  userRoleSchema,
  type AuthFormValues,
  type AuthUser,
  type UserRole,
} from "shared/auth/types";

type LambdaAuthResponse = {
  token?: string;
};

type CognitoJwtPayload = {
  username?: string;
  "cognito:groups"?: string[];
};

const authPath = "/auth";

function getAuthUrl() {
  if (!authConfig.lambdaFunctionUrl) {
    throw new Error("Missing auth Lambda function URL");
  }

  const baseUrl = authConfig.lambdaFunctionUrl.replace(/\/$/, "");

  return `${baseUrl}${authPath}`;
}

function getRolesFromGroups(groups: string[] = []): UserRole[] {
  return groups.filter((group): group is UserRole =>
    userRoleSchema.safeParse(group).success
  );
}

function createAuthUser(token: string): AuthUser {
  const decodedToken = jwtDecode<CognitoJwtPayload>(token);
  const username = decodedToken.username;

  if (!username) {
    throw new Error("Auth token did not include a username");
  }

  return authUserSchema.parse({
    username,
    roles: getRolesFromGroups(decodedToken["cognito:groups"]),
  });
}

export class AuthServiceImpl implements AuthService {
  private token: string | null = null;

  async login(values: AuthFormValues): Promise<AuthUser> {
    const response = await axios.post<LambdaAuthResponse>(
      getAuthUrl(),
      {
        username: values.username,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.token) {
      throw new Error("Auth response did not include a token");
    }

    this.token = response.data.token;
    return createAuthUser(response.data.token);
  }

  getToken() {
    return this.token;
  }
}

export const authService = new AuthServiceImpl();
