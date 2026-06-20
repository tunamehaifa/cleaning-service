import { Box, Button, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { ColorModeButton } from "../../../shared/ui/components/color-mode";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg.panel"
      backdropFilter="blur(10px)"
    >
      <Container maxW="1120px" px={{ base: 4, md: 6 }}>
        <Flex
          as="nav"
          minH="64px"
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 6 }}
          py={{ base: 3, sm: 0 }}
          aria-label="Main navigation"
        >
          <Flex gap="2" overflowX="auto" w={{ base: "100%", sm: "auto" }}>
            {navItems.map((item) => (
              <Button
                asChild
                key={item.href}
                borderRadius="md"
                colorPalette="blue"
                color="fg"
                size="sm"
                variant="ghost"
                _hover={{ bg: "bg.muted", color: "fg" }}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <ColorModeButton />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
