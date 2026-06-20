// src/features/auth/components/LoginFormContainer.tsx

import { Box } from "@chakra-ui/react";

type LoginFormContainerProps = {
  children: React.ReactNode;
};

export function LoginFormContainer({ children }: LoginFormContainerProps) {
  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="80px"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
    >
      {children}
    </Box>
  );
}