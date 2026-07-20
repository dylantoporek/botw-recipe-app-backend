import React, { useEffect } from "react";
import { Box, Flex, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import "../App.css";
import { motion } from "framer-motion";
import Instructions from "../Components/Instructions";
import { ItemCard, SectionHeader } from "../Components/UI";
import { useNavigate } from "react-router-dom";

function Home({ changePage, recipeList, ingredientList }) {
  const navigate = useNavigate();
  useEffect(() => {
    changePage(window.location.href);
  }, []);

  const featuredRecipes = recipeList.filter((r) => r.name).slice(0, 4);
  const featuredIngredients = ingredientList.filter((i) => i.name).slice(0, 6);

  return (
    <Box pt={{ base: "56px", md: "68px" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Hero */}
        <Box borderBottom="1px solid" borderColor="paper.300" bg="paper.50">
          <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
            <Text
              textTransform="uppercase"
              letterSpacing="0.14em"
              fontSize="xs"
              fontWeight={700}
              color="accent.500"
              mb={4}
            >
              The Breath of the Wild cookbook
            </Text>
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight={600}
              lineHeight={1.05}
              maxW="16ch"
            >
              Cook your way through Hyrule.
            </Heading>
            <Text mt={5} fontSize={{ base: "md", md: "lg" }} color="ink.500" maxW="52ch">
              Browse every recipe in the wild, stock your pantry from the shop, and
              turn ingredients into hearty dishes in your own kitchen.
            </Text>
            <Flex gap={3} mt={8} flexWrap="wrap">
              <Button size="lg" variant="accent" onClick={() => navigate("/recipes")}>
                Browse recipes
              </Button>
              <Button size="lg" variant="quiet" onClick={() => navigate("/shop")}>
                Shop ingredients
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Featured recipes */}
          <Box mt={{ base: 10, md: 16 }}>
            <SectionHeader
              title="Featured recipes"
              action="View all"
              onAction={() => navigate("/recipes")}
            />
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 3, md: 6 }}>
              {featuredRecipes.map((recipe) => (
                <ItemCard
                  key={recipe.id}
                  item={recipe}
                  tall
                  onClick={() => navigate("/recipes")}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* Featured ingredients */}
          <Box mt={{ base: 10, md: 16 }}>
            <SectionHeader
              title="Featured ingredients"
              action="Shop all"
              onAction={() => navigate("/shop")}
            />
            <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={{ base: 3, md: 4 }}>
              {featuredIngredients.map((ingredient) => (
                <ItemCard
                  key={ingredient.id}
                  item={ingredient}
                  onClick={() => navigate("/shop")}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* How it works */}
          <Box mt={{ base: 10, md: 16 }} mb={{ base: 12, md: 20 }}>
            <Instructions />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Home;
