import React, { useState } from "react";
import { Flex, Text, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDir="column" gap={4}>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight={600}>
            Username
          </FormLabel>
          <Input
            id="username"
            type="text"
            autoComplete="off"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight={600}>
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="accent" mt={2} w="100%">
          Log in
        </Button>
        {errors.length ? (
          <Flex flexDir="column" gap={1}>
            {errors.map((err) => (
              <Text key={err} color="accent.500" fontSize="sm">
                {err}
              </Text>
            ))}
          </Flex>
        ) : null}
      </Flex>
    </form>
  );
}

export default LoginForm;
