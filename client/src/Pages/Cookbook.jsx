import React, { useState, useEffect } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CookBookNav from "../Components/CookBookNav";
import Recipe from "../Components/Recipe";
import CookBookDetails from "../Components/CookBookDetails";

function Cookbook({ ingredientList, recipeList, changePage, changePinnedRecipe }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const [togDetails, setTogDetails] = useState(false);
  const [specificRecipe, setSpecificRecipe] = useState(null);

  useEffect(() => {
    changePage(window.location.href);
  }, []);

  const filteredByCategory = recipeList.filter((recipe) => {
    if (categoryFilter === "All" && recipe.category !== "Elixer" && !recipe.name.includes("Monster")) {
      return recipe;
    }
    if (categoryFilter !== "All" && recipe.category !== "Elixer") {
      return recipe.category.includes(categoryFilter);
    }
  });

  const filteredByName = filteredByCategory.filter((recipe) => {
    if (nameFilter === "") {
      return recipe;
    }
    return recipe.name ? recipe.name.toLowerCase().includes(nameFilter.toLowerCase()) : null;
  });

  return (
    <Box pt={{ base: "56px", md: "68px" }} minH="100vh">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
          <CookBookNav
            name={nameFilter}
            category={categoryFilter}
            setNameFilter={setNameFilter}
            setCategoryFilter={setCategoryFilter}
            resultCount={filteredByName.length}
          />

          {filteredByName.length ? (
            <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={{ base: 3, md: 6 }} mt={8}>
              {filteredByName.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  setTogDetails={setTogDetails}
                  setSpecificRecipe={setSpecificRecipe}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text mt={12} color="ink.500">
              No recipes match your search.
            </Text>
          )}
        </Box>

        {togDetails ? (
          <CookBookDetails
            ingredientList={ingredientList}
            togDetails={togDetails}
            recipe={specificRecipe}
            setTogDetails={setTogDetails}
            changePinnedRecipe={changePinnedRecipe}
          />
        ) : null}
      </motion.div>
    </Box>
  );
}

export default Cookbook;
