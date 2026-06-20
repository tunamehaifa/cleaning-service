export type UserRole = "admin" | "cleaner" | "user";

export type AuthenticatedUser = {
  name: string;
  role: UserRole;
};

type AuthCredentials = {
  email: string;
  password: string;
};

type DemoUser = AuthenticatedUser & AuthCredentials;

const demoUsers: DemoUser[] = [
  {
    email: "admin@test.com",
    password: "123456",
    name: "Admin",
    role: "admin",
  },
  {
    email: "cleaner@test.com",
    password: "123456",
    name: "Cleaner",
    role: "cleaner",
  },
  {
    email: "user@test.com",
    password: "123456",
    name: "User",
    role: "user",
  },
];

export function authenticateUser({
  email,
  password,
}: AuthCredentials): AuthenticatedUser | null {
  const user = demoUsers.find(
    (demoUser) => demoUser.email === email && demoUser.password === password
  );

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    role: user.role,
  };
}
