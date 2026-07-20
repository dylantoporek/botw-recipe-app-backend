import React, { useState, useEffect } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Ingredient from "../Components/Ingredient";
import StoreNav from "../Components/StoreNav";
import StoreDetails from "../Components/StoreDetails";

function Store({ ingredientList, addItemToCart, changePage }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const [togDetails, setTogDetails] = useState(false);
  const [specificIng, setSpecificIng] = useState(null);

  useEffect(() => {
    changePage(window.location.href);
  }, []);

  const filteredByCategory = ingredientList.filter((ing) => {
    if (categoryFilter === "All") {
      return ing;
    }
    return ing.category === categoryFilter;
  });

  const filteredByName = filteredByCategory.filter((ing) => {
    if (nameFilter === "") {
      return ing;
    }
    return ing.name ? ing.name.toLowerCase().includes(nameFilter.toLowerCase()) : null;
  });

  return (
    <Box pt={{ base: "56px", md: "68px" }} minH="100vh">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
          <StoreNav
            nameFilter={nameFilter}
            category={categoryFilter}
            setNameFilter={setNameFilter}
            setCategoryFilter={setCategoryFilter}
            resultCount={filteredByName.length}
          />

          {filteredByName.length ? (
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={{ base: 3, md: 5 }} mt={8}>
              {filteredByName.map((ingredient) =>
                ingredient.name ? (
                  <Ingredient
                    key={ingredient.id}
                    ing={ingredient}
                    setTogDetails={setTogDetails}
                    setSpecificIng={setSpecificIng}
                  />
                ) : null
              )}
            </SimpleGrid>
          ) : (
            <Text mt={12} color="ink.500">
              No ingredients match your search.
            </Text>
          )}
        </Box>

        {togDetails ? (
          <StoreDetails
            ing={specificIng}
            togDetails={togDetails}
            addItemToCart={addItemToCart}
            setTogDetails={setTogDetails}
          />
        ) : null}
      </motion.div>
    </Box>
  );
}

export default Store;
