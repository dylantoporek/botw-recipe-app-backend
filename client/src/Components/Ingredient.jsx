import React from "react";
import { ItemCard } from "./UI";

function Ingredient({ ing, setTogDetails, setSpecificIng }) {
  function openDetails() {
    setSpecificIng(ing);
    setTogDetails(true);
  }

  return <ItemCard item={ing} onClick={openDetails} />;
}

export default Ingredient;
