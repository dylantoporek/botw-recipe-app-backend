import React from "react";
import { Flex, Text, Button, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AccountSettings({ user, setUser, as }) {
  const navigate = useNavigate();
  function handleLogoutClick() {
    fetch("/api/v1/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/");
  }

  if (as === "menu-item") {
    return (
      <MenuItem onClick={handleLogoutClick} fontSize="sm" fontWeight={600}>
        Sign out
      </MenuItem>
    );
  }

  return (
    <Flex alignItems="center" flexDir="column" gap={5}>
      <Text>{user ? user.username : null}</Text>
      <Button size="sm" variant="quiet" onClick={handleLogoutClick}>
        Sign out
      </Button>
    </Flex>
  );
}
