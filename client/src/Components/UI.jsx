import React from "react";
import { Box, Flex, Text, Heading, Image, Input, Button } from "@chakra-ui/react";
import rupee from "../Images/rupee.png";

// Shared building blocks for the editorial look.

export function Eyebrow({ children, ...rest }) {
  return (
    <Text
      textTransform="uppercase"
      letterSpacing="0.12em"
      fontSize="11px"
      fontWeight={600}
      color="accent.500"
      {...rest}
    >
      {children}
    </Text>
  );
}

export function RupeePrice({ value, fontSize = "sm", ...rest }) {
  return (
    <Flex alignItems="center" gap={1.5} {...rest}>
      <Image h="14px" src={rupee} alt="rupees" />
      <Text fontSize={fontSize} fontWeight={600} color="ink.700">
        {value}
      </Text>
    </Flex>
  );
}

export function SectionHeader({ title, action, onAction }) {
  return (
    <Flex
      alignItems="baseline"
      justifyContent="space-between"
      borderTop="2px solid"
      borderColor="ink.900"
      pt={4}
      mb={6}
    >
      <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight={600}>
        {title}
      </Heading>
      {action ? (
        <Text
          as="button"
          onClick={onAction}
          fontSize="sm"
          fontWeight={600}
          color="accent.500"
          _hover={{ color: "accent.700", textDecoration: "underline" }}
        >
          {action} →
        </Text>
      ) : null}
    </Flex>
  );
}

// Card used for both recipes and ingredients: icon on a warm tile,
// category eyebrow, serif name, price.
export function ItemCard({ item, onClick, tall }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      textAlign="left"
      bg="white"
      border="1px solid"
      borderColor="paper.300"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.15s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 10px 24px rgba(34,33,30,0.10)",
        borderColor: "ink.500",
      }}
    >
      <Flex
        bg="paper.200"
        alignItems="center"
        justifyContent="center"
        h={tall ? "150px" : "120px"}
      >
        <Image
          className="game-icon"
          maxH={tall ? "90px" : "64px"}
          maxW={tall ? "90px" : "64px"}
          src={item.image}
          alt={item.name}
        />
      </Flex>
      <Box p={4}>
        <Eyebrow mb={1}>{item.category}</Eyebrow>
        <Heading fontSize="md" fontWeight={600} noOfLines={2} mb={2}>
          {item.name}
        </Heading>
        <RupeePrice value={item.price} />
      </Box>
    </Box>
  );
}

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <Input
      maxW={{ base: "100%", md: "280px" }}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export function FilterChips({ options, active, onSelect }) {
  return (
    <Flex gap={2} flexWrap="wrap">
      {["All", ...options].map((option) => {
        const isActive = active === option;
        return (
          <Button
            key={option}
            size="sm"
            variant={isActive ? "primary" : "quiet"}
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        );
      })}
    </Flex>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "flex-end" }}
      justifyContent="space-between"
      gap={4}
      mb={6}
    >
      <Box>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight={600}>
          {title}
        </Heading>
        {subtitle ? (
          <Text mt={2} color="ink.500" fontSize="sm">
            {subtitle}
          </Text>
        ) : null}
      </Box>
      {children}
    </Flex>
  );
}
