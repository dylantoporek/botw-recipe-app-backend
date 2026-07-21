import React from "react";
import { Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function Pantry({ item, pot, addItemToPot, removeFromPot }) {
  // Quantity comes straight from the pantry data (kept in sync with the
  // server by the Kitchen), so rows can't drift out of date.
  const quantity = item.quantity;

  function addToPot() {
    if (quantity > 0 && pot.length < 5) {
      addItemToPot(item, quantity);
    }
    if (quantity === 0) {
      alert(`You are out of ${item.ingredient.name}. You can purchase more from the store.`);
    }
    if (pot.length === 5) {
      alert("The pot can only hold 5 ingredients.");
    }
  }

  function handleRemoveFromPot() {
    let potCheck = pot.find((ing) => ing.id === item.id);

    if (potCheck !== undefined) {
      removeFromPot(item, quantity);
    } else {
      alert(`There is no ${item.ingredient.name} in the pot.`);
    }
  }

  function disableRemoveFromPotButton() {
    let potCheck = pot.find((ing) => ing.id === item.id);
    if (potCheck !== undefined) {
      return false;
    } else return true;
  }

  return (
    <Flex
      alignItems="center"
      gap={3}
      py={2.5}
      borderBottom="1px solid"
      borderColor="paper.200"
      _last={{ borderBottom: "none" }}
    >
      <Flex
        bg="paper.200"
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
        boxSize="40px"
        flexShrink={0}
      >
        <Image className="game-icon" maxH="70%" maxW="70%" src={item.ingredient.image} alt="" />
      </Flex>

      <Flex flexDir="column" flex="1" minW={0}>
        <Text fontWeight={600} fontSize="sm" noOfLines={1}>
          {item.ingredient.name}
        </Text>
        <Text fontSize="xs" color="ink.500">
          x{quantity} in pantry
        </Text>
      </Flex>

      <IconButton
        aria-label={`Remove ${item.ingredient.name} from pot`}
        size="xs"
        variant="quiet"
        borderRadius="full"
        isDisabled={disableRemoveFromPotButton()}
        onClick={() => handleRemoveFromPot()}
        icon={<MinusIcon boxSize={2} />}
      />
      <IconButton
        aria-label={`Add ${item.ingredient.name} to pot`}
        size="xs"
        variant="primary"
        borderRadius="full"
        isDisabled={quantity === 0}
        onClick={() => addToPot()}
        icon={<AddIcon boxSize={2} />}
      />
    </Flex>
  );
}

export default Pantry;
