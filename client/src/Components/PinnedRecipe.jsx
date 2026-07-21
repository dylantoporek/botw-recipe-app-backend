import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Heading, Image, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Eyebrow } from "./UI";

export default function PinnedRecipe({ pinnedRecipe, ingredientList, changePinnedRecipe }) {
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pinnedRecipe) {
      let ingredients = [];
      let item1 = ingredientList.find((ing) => ing.name !== null && ing.name === pinnedRecipe.ingredient1);
      let item2 = ingredientList.find((ing) => ing.name !== null && ing.name === pinnedRecipe.ingredient2);
      let item3 = ingredientList.find((ing) => ing.name !== null && ing.name === pinnedRecipe.ingredient3);
      let item4 = ingredientList.find((ing) => ing.name !== null && ing.name === pinnedRecipe.ingredient4);
      let item5 = ingredientList.find((ing) => ing.name !== null && ing.name === pinnedRecipe.ingredient5);
      ingredients.push(item1, item2, item3, item4, item5);
      setRecipeIngredients([...ingredients]);
    } else {
      setRecipeIngredients([]);
    }
  }, [pinnedRecipe]);

  return (
    <Box bg="white" border="1px solid" borderColor="paper.300" borderRadius="xl" p={5}>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Eyebrow>Pinned recipe</Eyebrow>
        {pinnedRecipe && changePinnedRecipe ? (
          <IconButton
            aria-label="Unpin recipe"
            title="Unpin recipe"
            size="xs"
            variant="quiet"
            borderRadius="full"
            onClick={() => changePinnedRecipe(null)}
            icon={<CloseIcon boxSize={2} />}
          />
        ) : null}
      </Flex>
      {recipeIngredients.length > 0 && pinnedRecipe ? (
        <Box>
          <Heading fontSize="lg" fontWeight={600} mb={3}>
            {pinnedRecipe.name}
          </Heading>
          <Flex flexDir="column" gap={2}>
            {recipeIngredients.map((ing) => {
              if (ing !== undefined) {
                return (
                  <Flex key={ing.id} gap={2} alignItems="center">
                    <Flex
                      bg="paper.200"
                      borderRadius="md"
                      alignItems="center"
                      justifyContent="center"
                      boxSize="28px"
                      flexShrink={0}
                    >
                      <Image className="game-icon" maxH="70%" maxW="70%" src={ing.image} alt="" />
                    </Flex>
                    <Text fontSize="sm">{ing.name}</Text>
                  </Flex>
                );
              }
            })}
          </Flex>
        </Box>
      ) : (
        <Box>
          <Heading fontSize="lg" fontWeight={600} mb={2}>
            Not sure what to cook?
          </Heading>
          <Text fontSize="sm" color="ink.500" mb={4}>
            Pin a recipe from the cookbook and its ingredients will show up here.
          </Text>
          <Button size="sm" variant="quiet" onClick={() => navigate("/recipes")}>
            Browse recipes
          </Button>
        </Box>
      )}
    </Box>
  );
}
