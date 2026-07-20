import React from "react";
import { ItemCard } from "./UI";

function Recipe({ recipe, setTogDetails, setSpecificRecipe }) {
  let priceRewrite = recipe.price;
  if (recipe.price === 0) {
    priceRewrite = 25;
  }

  function openDetails() {
    setTogDetails(true);
    setSpecificRecipe(recipe);
  }

  return (
    <ItemCard item={{ ...recipe, price: priceRewrite }} tall onClick={openDetails} />
  );
}

export default Recipe;
