import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import chef from "../Images/pot.png";

function Pot({ pot }) {
  return (
    <Box>
      <Flex justifyContent="center">
        <Image maxW={{ base: "260px", md: "360px" }} src={chef} alt="A chef stirring the cooking pot" />
      </Flex>

      <Text
        mt={2}
        fontSize="xs"
        fontWeight={700}
        textTransform="uppercase"
        letterSpacing="0.1em"
        color="ink.500"
      >
        In the pot · {pot.length}/5
      </Text>

      <Flex gap={2} mt={3} justifyContent="center" flexWrap="wrap" minH="44px">
        {pot.length > 0 ? (
          pot.map((item, i) => (
            <motion.div key={`${item.id}-${i}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <Flex
                alignItems="center"
                gap={2}
                bg="paper.100"
                border="1px solid"
                borderColor="paper.300"
                borderRadius="full"
                px={3}
                py={1.5}
              >
                <Image className="game-icon" h="20px" src={item.ingredient.image} alt="" />
                <Text fontSize="sm" fontWeight={500}>
                  {item.ingredient.name}
                </Text>
              </Flex>
            </motion.div>
          ))
        ) : (
          <Text fontSize="sm" color="ink.500" alignSelf="center">
            The pot is empty — add ingredients from your pantry.
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default Pot;
