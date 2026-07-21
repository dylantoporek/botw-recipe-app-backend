import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Pantry from "./Pantry";
import Dish from "./Dish";

// Left panel of the Kitchen: switch between the pantry and cooked dishes.
export default function KitchenNav({
  togDisplay,
  handlePantryOrDish,
  pantries,
  pot,
  addItemToPot,
  removeFromPot,
  dishes,
  user,
  setUser,
  sellRecipe,
}) {
  const showingDishes = togDisplay;

  return (
    <Box bg="white" border="1px solid" borderColor="paper.300" borderRadius="xl" overflow="hidden">
      <Flex borderBottom="1px solid" borderColor="paper.200" p={3} gap={2}>
        <Button
          size="sm"
          flex="1"
          variant={!showingDishes ? "primary" : "quiet"}
          onClick={() => showingDishes && handlePantryOrDish()}
        >
          Pantry{pantries.length ? ` · ${pantries.length}` : ""}
        </Button>
        <Button
          size="sm"
          flex="1"
          variant={showingDishes ? "primary" : "quiet"}
          onClick={() => !showingDishes && handlePantryOrDish()}
        >
          Dishes{dishes.length ? ` · ${dishes.length}` : ""}
        </Button>
      </Flex>

      <Box maxH={{ base: "300px", lg: "560px" }} overflowY="auto" px={3} py={1}>
        {!showingDishes ? (
          pantries.length > 0 ? (
            pantries.map((pantryItem) => (
              <Pantry
                key={pantryItem.id}
                item={pantryItem}
                pot={pot}
                addItemToPot={addItemToPot}
                removeFromPot={removeFromPot}
              />
            ))
          ) : (
            <Text color="ink.500" fontSize="sm" p={3}>
              Your pantry is empty — stock up in the Shop.
            </Text>
          )
        ) : dishes.length > 0 ? (
          dishes.map((dishItem) => (
            <Dish
              key={dishItem.id}
              item={dishItem}
              user={user}
              setUser={setUser}
              sellRecipe={sellRecipe}
            />
          ))
        ) : (
          <Text color="ink.500" fontSize="sm" p={3}>
            No dishes yet — cook something!
          </Text>
        )}
      </Box>
    </Box>
  );
}
