// src/app/login/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Stack, Text, Field } from "@chakra-ui/react";

import { LoginFormContainer } from "@/features/auth/components/LoginFormContainer";

type LoginFormValues = {
  email: string;
  password: string;
};

type UserRole = "admin" | "cleaner" | "user";

type LoginUser = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
};

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
  return loginUsers.find(
    (user) => user.email === email && user.password === password
  );
}

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    const user = checkPassword(values.email, values.password);

    if (user) {
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
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={Boolean(errors.password)}>
            <Field.Label>Password</Field.Label>

            <Input
              type="password"
              placeholder="123456"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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
