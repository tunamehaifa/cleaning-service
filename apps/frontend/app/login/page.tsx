// src/app/login/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Stack, Text, Field } from "@chakra-ui/react";

import { LoginFormContainer } from "@/features/auth/components/LoginFormContainer";
import { useAuthStore } from "@/shared/store/auth-store";
import {
  authSchema,
  authUserSchema,
  type AuthFormValues,
  type AuthUser,
} from "@/shared/auth/types";

type LoginUser = AuthUser & AuthFormValues;

const loginUsers: LoginUser[] = [
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

function checkPassword(email: string, password: string) {
  const parsedUsers = authUserSchema
    .and(authSchema)
    .array()
    .parse(loginUsers);

  return parsedUsers.find(
    (user) => user.email === email && user.password === password
  );
}

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthFormValues) {
    const user = checkPassword(values.email, values.password);

    if (user) {
      setUser(user);
      router.push("/");
      return;
    }

    setError("root", {
      message: "Wrong email or password",
    });
  }

  return (
    <LoginFormContainer>
      <Heading mb="6">Login</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4">
          <Field.Root invalid={Boolean(errors.email)}>
            <Field.Label>Email</Field.Label>

            <Input
              type="email"
              placeholder="admin@test.com"
              {...register("email")}
            />

            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={Boolean(errors.password)}>
            <Field.Label>Password</Field.Label>

            <Input
              type="password"
              placeholder="123456"
              {...register("password")}
            />

            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          {errors.root?.message && (
            <Text color="red.500">{errors.root.message}</Text>
          )}

          <Button type="submit" loading={isSubmitting}>
            Login
          </Button>
        </Stack>
      </form>
    </LoginFormContainer>
  );
}
