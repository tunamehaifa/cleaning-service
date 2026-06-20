import { Box, Heading, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box p="6">
      <Box>
        <Text color="blue.600" fontWeight="bold">
          Cleaning Service
        </Text>
        <Heading size="lg">Loading...</Heading>
        <Text>Please wait while we prepare the page.</Text>
      </Box>
    </Box>
  );
}
