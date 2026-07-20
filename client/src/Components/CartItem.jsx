import React from "react";
import {
  Flex,
  Text,
  Button,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { RupeePrice } from "./UI";

function CartItem({ item, cart, setCart, removeFromCart }) {
  function updateQuantity(num) {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    const filteredCart = cart.filter((cartItem) => cartItem.id !== item.id);
    const updatedItem = {
      ...item,
      quantity: num,
    };
    const updatedCart = [...filteredCart];
    updatedCart.splice(index, 0, updatedItem);
    setCart(updatedCart);
  }

  const quantityOptions = [];
  if (item.quantity > 2) quantityOptions.push(1);
  if (item.quantity > 1) quantityOptions.push(parseInt(item.quantity) - 1);
  for (let add = 1; add <= 5; add++) {
    quantityOptions.push(parseInt(item.quantity) + add);
  }

  return (
    <Flex
      alignItems="center"
      gap={{ base: 3, md: 4 }}
      py={4}
      borderBottom="1px solid"
      borderColor="paper.200"
      _last={{ borderBottom: "none" }}
    >
      <Flex
        bg="paper.200"
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
        boxSize={{ base: "44px", md: "56px" }}
        flexShrink={0}
      >
        <Image className="game-icon" maxH="70%" maxW="70%" src={item.image} alt="" />
      </Flex>

      <Flex flexDir="column" flex="1" minW={0}>
        <Text fontWeight={600} fontSize="sm" noOfLines={1}>
          {item.name}
        </Text>
        <RupeePrice value={item.price} fontSize="xs" />
      </Flex>

      <Menu>
        <MenuButton as={Button} size="sm" variant="quiet" rightIcon={<ChevronDownIcon />}>
          {item.quantity}
        </MenuButton>
        <MenuList minW="80px" borderColor="paper.300">
          {quantityOptions.map((num) => (
            <MenuItem key={num} onClick={() => updateQuantity(num)}>
              {num}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Flex minW={{ base: "60px", md: "80px" }} justifyContent="flex-end">
        <RupeePrice value={parseInt(item.price) * parseInt(item.quantity)} />
      </Flex>

      <IconButton
        aria-label={`Remove ${item.name}`}
        size="xs"
        variant="quiet"
        borderRadius="full"
        onClick={() => removeFromCart(item)}
        icon={<CloseIcon boxSize={2} />}
      />
    </Flex>
  );
}

export default CartItem;
