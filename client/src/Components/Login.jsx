import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ user, onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Once logged in (including arriving here while already logged in),
  // return to wherever the visitor was headed.
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user]);

  return (
    <Flex minH="100vh" bg="paper.100" alignItems="center" justifyContent="center" px={4}>
      <Box w="100%" maxW="420px" py={10}>
        <Flex flexDir="column" alignItems="center" mb={8}>
          <Image src="/triforce.svg" alt="" maxW="34px" mb={4} />
          <Heading fontSize="4xl" fontWeight={600} textAlign="center">
            BOTW Kitchen
          </Heading>
          <Text mt={2} color="ink.500" fontSize="sm" textAlign="center">
            {from === "/kitchen"
              ? "Log in to use your kitchen."
              : from === "/cart"
              ? "Log in to complete your purchase."
              : "Recipes, ingredients, and your own kitchen — cook your way through Hyrule."}
          </Text>
        </Flex>

        <Box
          bg="white"
          border="1px solid"
          borderColor="paper.300"
          borderRadius="xl"
          p={{ base: 6, md: 8 }}
          boxShadow="0 12px 32px rgba(34,33,30,0.06)"
        >
          <Heading fontSize="xl" fontWeight={600} mb={5}>
            {showLogin ? "Welcome back" : "Create your account"}
          </Heading>
          {showLogin ? <LoginForm onLogin={onLogin} /> : <SignupForm onLogin={onLogin} />}
        </Box>

        <Flex gap={1.5} mt={6} justifyContent="center" fontSize="sm">
          <Text color="ink.500">
            {showLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Text
            as="button"
            fontWeight={700}
            color="accent.500"
            _hover={{ color: "accent.700", textDecoration: "underline" }}
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Sign up" : "Log in"}
          </Text>
        </Flex>

        <Text
          as="button"
          display="block"
          mx="auto"
          mt={4}
          fontSize="sm"
          color="ink.500"
          _hover={{ color: "ink.900", textDecoration: "underline" }}
          onClick={() => navigate("/")}
        >
          ← Continue browsing without an account
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
