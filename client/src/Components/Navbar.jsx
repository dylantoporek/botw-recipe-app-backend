import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import rupee from "../Images/rupee.png";
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AccountSettings from "./AccountSettings";
import "../App.css";

const NAV_LINKS = [
  { label: "Recipes", path: "/recipes" },
  { label: "Shop", path: "/shop" },
  { label: "Kitchen", path: "/kitchen" },
];

function Navbar({ user, setUser, selectedPage, cart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandNav, setExpandNav] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false,
  });

  function go(path) {
    setExpandNav(false);
    navigate(path);
  }

  const wordmark = (
    <Flex
      alignItems="center"
      gap={2.5}
      cursor="pointer"
      onClick={() => go("/")}
    >
      <Image src="/triforce.svg" alt="" maxW="22px" />
      <Heading fontSize="xl" fontWeight={600} letterSpacing="-0.01em">
        BOTW Kitchen
      </Heading>
    </Flex>
  );

  const cartIcon = (
    <Box position="relative" cursor="pointer" onClick={() => go("/cart")} title="Cart">
      <Image maxW="22px" src="/cart.svg" alt="Cart" />
      {cart.length > 0 ? (
        <Flex
          position="absolute"
          top="-6px"
          right="-8px"
          bg="accent.500"
          color="white"
          borderRadius="full"
          minW="16px"
          h="16px"
          fontSize="10px"
          fontWeight={700}
          alignItems="center"
          justifyContent="center"
          px={1}
        >
          {cart.length}
        </Flex>
      ) : null}
    </Box>
  );

  const bankAndCart = user ? (
    <Flex alignItems="center" gap={{ base: 4, md: 6 }}>
      <Flex alignItems="center" gap={1.5} title="Your rupees">
        <Image maxH="18px" src={rupee} alt="rupees" />
        <Text fontWeight={600} fontSize="sm">
          {user.bank}
        </Text>
      </Flex>
      {cartIcon}
      <Menu placement="bottom-end">
        <MenuButton>
          <Image cursor="pointer" src="/account_circle.svg" alt="Account" />
        </MenuButton>
        <MenuList borderColor="paper.300" py={2}>
          <Box px={4} py={1}>
            <Text fontSize="xs" color="ink.500">
              Signed in as
            </Text>
            <Text fontWeight={600}>{user.username}</Text>
          </Box>
          <MenuDivider borderColor="paper.300" />
          <AccountSettings user={user} setUser={setUser} as="menu-item" />
        </MenuList>
      </Menu>
    </Flex>
  ) : (
    <Flex alignItems="center" gap={{ base: 3, md: 5 }}>
      {cartIcon}
      <Button size="sm" variant="accent" onClick={() => go("/login")}>
        Log in
      </Button>
    </Flex>
  );

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={20}
      bg="rgba(255,255,255,0.96)"
      backdropFilter="saturate(180%) blur(6px)"
      borderBottom="1px solid"
      borderColor="paper.300"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        h={{ base: "56px", md: "68px" }}
        alignItems="center"
        justifyContent="space-between"
      >
        {isMobile ? (
          <IconButton
            aria-label="Menu"
            variant="ghost"
            icon={expandNav ? <CloseIcon boxSize={3} /> : <HamburgerIcon boxSize={5} />}
            onClick={() => setExpandNav(!expandNav)}
          />
        ) : null}

        {wordmark}

        {!isMobile ? (
          <Flex as="nav" gap={8} alignItems="center">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Text
                  key={link.label}
                  cursor="pointer"
                  onClick={() => go(link.path)}
                  fontSize="sm"
                  fontWeight={600}
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  color={isActive ? "accent.500" : "ink.700"}
                  borderBottom="2px solid"
                  borderColor={isActive ? "accent.500" : "transparent"}
                  pb={1}
                  _hover={{ color: "accent.500" }}
                >
                  {link.label}
                </Text>
              );
            })}
          </Flex>
        ) : null}

        {bankAndCart}
      </Flex>

      {isMobile && expandNav ? (
        <Box bg="white" borderTop="1px solid" borderColor="paper.300" px={6} py={4}>
          {[{ label: "Home", path: "/" }, ...NAV_LINKS].map((link) => (
            <Text
              key={link.label}
              py={3}
              fontSize="md"
              fontWeight={600}
              cursor="pointer"
              borderBottom="1px solid"
              borderColor="paper.200"
              onClick={() => go(link.path)}
            >
              {link.label}
            </Text>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
