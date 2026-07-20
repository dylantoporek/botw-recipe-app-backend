import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader, SearchInput, FilterChips } from "./UI";

const CATEGORIES = [
  "Fruit",
  "Vegetable",
  "Mushroom",
  "Herb",
  "Red Meat",
  "Poultry",
  "Fish",
  "Crab",
  "Snail",
  "Misc",
];

function StoreNav({ nameFilter, category, setNameFilter, setCategoryFilter, resultCount }) {
  return (
    <Box>
      <PageHeader
        title="Shop"
        subtitle={`${resultCount} ingredient${resultCount === 1 ? "" : "s"} for your pantry`}
      >
        <SearchInput
          value={nameFilter}
          placeholder="Search ingredients"
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </PageHeader>
      <FilterChips
        options={CATEGORIES}
        active={category}
        onSelect={(option) => setCategoryFilter(option === category ? "All" : option)}
      />
    </Box>
  );
}

export default StoreNav;
