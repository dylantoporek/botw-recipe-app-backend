import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader, SearchInput, FilterChips } from "./UI";

const CATEGORIES = ["Meat", "Vegetarian", "Soup", "Seafood", "Curry", "Dessert"];

function CookBookNav({ name, category, setNameFilter, setCategoryFilter, resultCount }) {
  return (
    <Box>
      <PageHeader
        title="Recipes"
        subtitle={`${resultCount} recipe${resultCount === 1 ? "" : "s"} from across Hyrule`}
      >
        <SearchInput
          value={name}
          placeholder="Search recipes"
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

export default CookBookNav;
