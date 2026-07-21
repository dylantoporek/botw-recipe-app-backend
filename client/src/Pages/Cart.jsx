import React, { useState, useEffect } from "react";
import CartItem from "../Components/CartItem";
import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageHeader, RupeePrice } from "../Components/UI";

function Cart({ user, cart, deleteItemFromCart, checkPantryItems, setCart, setUser, changePage }) {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  useEffect(() => {
    changePage(window.location.href);
  }, []);

  let tallyTotal = 0;
  cart.forEach((item) => {
    tallyTotal = tallyTotal + item.price * item.quantity;
  });

  function checkoutItems() {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    if (user.bank > tallyTotal) {
      const newBankStatement = user.bank - tallyTotal;
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

      cart.forEach((item) => {
        checkPantryItems(item);
      });
      setShowCheckout(true);
      setCart([]);
    } else {
      alert("Transaction declined. Please make sure you have enough money to make your purchase.");
    }
  }

  function removeFromCart(item) {
    setDeletedItem(item);
    setShowRemove(true);
    deleteItemFromCart(item);
    setTimeout(() => {
      setShowRemove(false);
    }, 1000);
  }

  return (
    <Box pt={{ base: "56px", md: "68px" }} minH="100vh">
      {showRemove && deletedItem ? (
        <Alert status="info" position="fixed" top={0} zIndex={30}>
          <AlertIcon />
          <AlertTitle>{`${deletedItem.name} has been removed from your cart.`}</AlertTitle>
        </Alert>
      ) : null}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box maxW="1000px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
          <PageHeader
            title="Your cart"
            subtitle={
              cart.length
                ? `${cart.length} item${cart.length === 1 ? "" : "s"} ready for checkout`
                : null
            }
          />

          {showCheckout ? (
            <Box
              bg="white"
              border="1px solid"
              borderColor="paper.300"
              borderRadius="xl"
              p={{ base: 6, md: 10 }}
              textAlign="center"
            >
              <Heading fontSize="2xl" fontWeight={600} mb={2}>
                Transaction approved!
              </Heading>
              <Text color="ink.500" mb={6}>
                Your ingredients are stocked in your pantry.
              </Text>
              <Flex gap={3} justifyContent="center" flexWrap="wrap">
                <Button variant="accent" onClick={() => navigate("/kitchen")}>
                  Cook in the Kitchen
                </Button>
                <Button variant="quiet" onClick={() => navigate("/shop")}>
                  Keep shopping
                </Button>
              </Flex>
            </Box>
          ) : cart.length > 0 ? (
            <Flex flexDir={{ base: "column", lg: "row" }} gap={6} alignItems="flex-start">
              <Box
                flex="1"
                w="100%"
                bg="white"
                border="1px solid"
                borderColor="paper.300"
                borderRadius="xl"
                px={{ base: 4, md: 6 }}
                py={2}
              >
                {cart.map((item, i) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    i={i}
                    cart={cart}
                    setCart={setCart}
                    setShowRemove={setShowRemove}
                    removeFromCart={removeFromCart}
                    deleteItemFromCart={deleteItemFromCart}
                  />
                ))}
              </Box>

              <Box
                w={{ base: "100%", lg: "300px" }}
                bg="white"
                border="1px solid"
                borderColor="paper.300"
                borderRadius="xl"
                p={6}
                position={{ lg: "sticky" }}
                top={{ lg: "88px" }}
              >
                <Heading fontSize="lg" fontWeight={600} mb={4}>
                  Order summary
                </Heading>
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                  <Text color="ink.500" fontSize="sm">
                    Subtotal
                  </Text>
                  <RupeePrice value={tallyTotal} />
                </Flex>
                {user ? (
                  <Flex justifyContent="space-between" alignItems="center" mb={5}>
                    <Text color="ink.500" fontSize="sm">
                      Your rupees
                    </Text>
                    <RupeePrice value={user.bank} />
                  </Flex>
                ) : (
                  <Text color="ink.500" fontSize="sm" mb={5}>
                    You'll need to log in to complete your purchase.
                  </Text>
                )}
                <Button variant="accent" w="100%" onClick={() => checkoutItems()}>
                  {user ? "Checkout" : "Log in to checkout"}
                </Button>
              </Box>
            </Flex>
          ) : (
            <Box
              bg="white"
              border="1px solid"
              borderColor="paper.300"
              borderRadius="xl"
              p={{ base: 6, md: 10 }}
              textAlign="center"
            >
              <Heading fontSize="xl" fontWeight={600} mb={2}>
                Nothing in here yet
              </Heading>
              <Text color="ink.500" mb={6}>
                Try the Recipes or Shop sections for inspiration.
              </Text>
              <Flex gap={3} justifyContent="center" flexWrap="wrap">
                <Button variant="accent" onClick={() => navigate("/recipes")}>
                  Browse recipes
                </Button>
                <Button variant="quiet" onClick={() => navigate("/shop")}>
                  Shop ingredients
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}

export default Cart;
