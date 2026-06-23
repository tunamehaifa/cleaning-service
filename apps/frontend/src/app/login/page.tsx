// src/app/login/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Stack, Text, Field } from "@chakra-ui/react";

import { LoginFormContainer } from "features/auth/components/LoginFormContainer";
import { authService } from "features/auth/services/AuthServiceImpl";
import { useAuthStore } from "shared/store/auth-store";
import { authSchema, type AuthFormValues } from "shared/auth/types";

const loginErrorMessage = "Invalid username or password";

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
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    try {
      const user = await authService.login(values);

      setUser(user);
      router.push("/");
      return;
    } catch {
      setError("root", {
        message: loginErrorMessage,
      });
    }
  }

  return (
    <LoginFormContainer>
      <Heading mb="6">Login</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4">
          <Field.Root invalid={Boolean(errors.username)}>
            <Field.Label>Email</Field.Label>

            <Input
              type="text"
              placeholder="admin@test.com"
              {...register("username")}
            />

            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
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
