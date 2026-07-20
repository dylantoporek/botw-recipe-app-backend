import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Image,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Eyebrow, RupeePrice } from "./UI";

function CookBookDetails({ recipe, setTogDetails, changePinnedRecipe, ingredientList }) {
  const [showPin, setShowPin] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  useEffect(() => {
    if (recipe) {
      const names = [
        recipe.ingredient1,
        recipe.ingredient2,
        recipe.ingredient3,
        recipe.ingredient4,
        recipe.ingredient5,
      ];
      const ingredients = names
        .map((name) => ingredientList.find((ing) => ing.name !== null && ing.name === name))
        .filter((ing) => ing !== undefined);
      setRecipeIngredients(ingredients);
    }
  }, []);

  function handleChangePinnedRecipe() {
    changePinnedRecipe(recipe);
    setShowPin(true);
    setTimeout(() => {
      setTogDetails(false);
    }, 900);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        zIndex: 15,
        inset: 0,
        overflowY: "auto",
        background: "#FAF7F2",
      }}
    >
      {showPin ? (
        <Alert status="success" position="fixed" top={0} zIndex={30}>
          <AlertIcon />
          <AlertTitle>{`${recipe.name} is now pinned in your Kitchen.`}</AlertTitle>
        </Alert>
      ) : null}

      <Box maxW="900px" mx="auto" px={{ base: 4, md: 8 }} pt={{ base: "76px", md: "100px" }} pb={16}>
        <Flex
          alignItems="center"
          gap={2}
          cursor="pointer"
          color="accent.500"
          fontWeight={600}
          fontSize="sm"
          mb={6}
          _hover={{ color: "accent.700" }}
          onClick={() => setTogDetails(false)}
        >
          <ArrowBackIcon />
          <Text>Back to recipes</Text>
        </Flex>

        <Box
          bg="white"
          border="1px solid"
          borderColor="paper.300"
          borderRadius="xl"
          overflow="hidden"
        >
          <Flex flexDir={{ base: "column", md: "row" }}>
            <Flex
              bg="paper.200"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "220px", md: "360px" }}
              flex={{ md: "0 0 40%" }}
              p={8}
            >
              <Image
                className="game-icon"
                maxW={{ base: "140px", md: "200px" }}
                src={recipe.image}
                alt={recipe.name}
              />
            </Flex>

            <Box p={{ base: 6, md: 10 }} flex="1">
              <Eyebrow mb={2}>{recipe.category}</Eyebrow>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight={600} mb={3}>
                {recipe.name}
              </Heading>
              <Text color="ink.500" fontSize="md" mb={6}>
                {recipe.description}
              </Text>

              <Text
                fontSize="xs"
                fontWeight={700}
                textTransform="uppercase"
                letterSpacing="0.1em"
                color="ink.700"
                mb={3}
              >
                Ingredients
              </Text>
              <Flex gap={2} flexWrap="wrap" mb={8}>
                {recipeIngredients.map((ing) => (
                  <Flex
                    key={ing.id}
                    alignItems="center"
                    gap={2}
                    bg="paper.100"
                    border="1px solid"
                    borderColor="paper.300"
                    borderRadius="full"
                    px={3}
                    py={1.5}
                  >
                    <Image className="game-icon" h="22px" src={ing.image} alt="" />
                    <Text fontSize="sm" fontWeight={500}>
                      {ing.name}
                    </Text>
                  </Flex>
                ))}
              </Flex>

              <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={4}>
                <Stack spacing={0.5}>
                  <Text fontSize="xs" color="ink.500">
                    Sells for
                  </Text>
                  <RupeePrice value={recipe.price} fontSize="lg" />
                </Stack>
                <Button variant="accent" onClick={handleChangePinnedRecipe}>
                  Pin recipe to Kitchen
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
}

export default CookBookDetails;
