import React from "react";
import { Box, Text, Heading, SimpleGrid } from "@chakra-ui/react";
import { SectionHeader } from "./UI";

const STEPS = [
  {
    title: "Find a recipe",
    body: "Not sure what to cook? Browse the cookbook and pin a recipe you'd like to try.",
  },
  {
    title: "Shop for ingredients",
    body: "Need more ingredients? Spend your rupees in the shop to stock your pantry.",
  },
  {
    title: "Cook in your kitchen",
    body: "Toss up to five ingredients in the pot and turn them into hearty dishes.",
  },
];

export default function Instructions() {
  return (
    <Box>
      <SectionHeader title="How it works" />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 10 }}>
        {STEPS.map((step, i) => (
          <Box key={step.title}>
            <Text
              fontFamily="heading"
              fontSize="5xl"
              fontWeight={600}
              color="paper.300"
              lineHeight={1}
              mb={3}
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Heading fontSize="lg" fontWeight={600} mb={2}>
              {step.title}
            </Heading>
            <Text fontSize="sm" color="ink.500">
              {step.body}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
