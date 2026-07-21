import React from "react";
import rupee from "../Images/rupee.png";
import { Flex, Text, Button, Image } from "@chakra-ui/react";

function Dish({ item, sellRecipe, user, setUser }) {
  let priceRewrite = item.recipe.price;
  if (priceRewrite === 0) {
    priceRewrite = 25;
  }

  function handleSellItem() {
    let newBankStatement = user.bank + priceRewrite;
    sellRecipe(item);
    fetch(`/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bank: newBankStatement,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser({
            ...user,
            bank: data.bank,
          });
        });
      } else {
        r.json().catch((data) => console.log(data));
      }
    });
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
        <Image className="game-icon" maxH="80%" maxW="80%" src={item.recipe.image} alt="" />
      </Flex>

      <Text fontWeight={600} fontSize="sm" flex="1" minW={0} noOfLines={2}>
        {item.recipe.name}
      </Text>

      <Button size="xs" variant="quiet" onClick={handleSellItem} flexShrink={0}>
        <Flex gap={1} alignItems="center">
          <Text>Sell</Text>
          <Image maxH="12px" src={rupee} alt="" />
          <Text>{priceRewrite}</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default Dish;
