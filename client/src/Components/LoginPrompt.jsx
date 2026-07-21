import React from "react";
import { Box, Flex, Text, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Shown in place of a login-only page (the Kitchen) for logged-out visitors.
export default function LoginPrompt({ authChecked }) {
  const navigate = useNavigate();

  // Don't flash the prompt while the auto-login check is still in flight.
  if (!authChecked) return <Box pt={{ base: "56px", md: "68px" }} minH="100vh" />;

  return (
    <Box pt={{ base: "56px", md: "68px" }} minH="100vh">
      <Box maxW="520px" mx="auto" px={4} py={{ base: 12, md: 20 }}>
        <Box
          bg="white"
          border="1px solid"
          borderColor="paper.300"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          textAlign="center"
        >
          <Heading fontSize="2xl" fontWeight={600} mb={2}>
            Your kitchen awaits
          </Heading>
          <Text color="ink.500" mb={6}>
            Log in or create a free account to stock your pantry, cook dishes,
            and sell them for rupees.
          </Text>
          <Flex gap={3} justifyContent="center" flexWrap="wrap">
            <Button
              variant="accent"
              onClick={() => navigate("/login", { state: { from: "/kitchen" } })}
            >
              Log in or sign up
            </Button>
            <Button variant="quiet" onClick={() => navigate("/recipes")}>
              Browse recipes instead
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
