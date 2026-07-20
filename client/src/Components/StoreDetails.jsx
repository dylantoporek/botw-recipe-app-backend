import React, { useState } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Eyebrow, RupeePrice } from "./UI";

function StoreDetails({ ing, setTogDetails, addItemToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showPin, setShowPin] = useState(false);

  function removeOne() {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  }

  function addOne() {
    setQuantity((quantity) => quantity + 1);
  }

  function putInCart() {
    const newCartItem = {
      ...ing,
      quantity: quantity,
    };
    setShowPin(true);
    addItemToCart(newCartItem);
    setTimeout(() => {
      setTogDetails(false);
    }, 900);
  }

  const totalPrice = ing.price * quantity;

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
          <AlertTitle>{`${ing.name} was added to your cart.`}</AlertTitle>
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
          <Text>Back to shop</Text>
        </Flex>

        <Box bg="white" border="1px solid" borderColor="paper.300" borderRadius="xl" overflow="hidden">
          <Flex flexDir={{ base: "column", md: "row" }}>
            <Flex
              bg="paper.200"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "200px", md: "320px" }}
              flex={{ md: "0 0 40%" }}
              p={8}
            >
              <Image
                className="game-icon"
                maxW={{ base: "110px", md: "150px" }}
                src={ing.image}
                alt={ing.name}
              />
            </Flex>

            <Box p={{ base: 6, md: 10 }} flex="1">
              <Eyebrow mb={2}>{ing.category}</Eyebrow>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight={600} mb={3}>
                {ing.name}
              </Heading>
              <Text color="ink.500" fontSize="md" mb={8}>
                {ing.description}
              </Text>

              <Flex alignItems="center" gap={8} mb={8} flexWrap="wrap">
                <Stack spacing={0.5}>
                  <Text fontSize="xs" color="ink.500">
                    Price
                  </Text>
                  <RupeePrice value={ing.price} fontSize="lg" />
                </Stack>
                <Stack spacing={1.5}>
                  <Text fontSize="xs" color="ink.500">
                    Quantity
                  </Text>
                  <Flex alignItems="center" gap={3}>
                    <IconButton
                      aria-label="Remove one"
                      size="sm"
                      variant="quiet"
                      isDisabled={quantity === 1}
                      onClick={removeOne}
                      icon={<MinusIcon boxSize={2.5} />}
                    />
                    <Text fontWeight={700} minW="24px" textAlign="center">
                      {quantity}
                    </Text>
                    <IconButton
                      aria-label="Add one"
                      size="sm"
                      variant="quiet"
                      onClick={addOne}
                      icon={<AddIcon boxSize={2.5} />}
                    />
                  </Flex>
                </Stack>
              </Flex>

              <Button variant="accent" size="lg" w={{ base: "100%", md: "auto" }} onClick={putInCart}>
                Add to cart — {totalPrice} rupees
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
}

export default StoreDetails;
