import React from "react";
import { Input, Box } from "@chakra-ui/react";

export const SearchBar = ({ onSearch }) => {
  return (
    <Box mb={4}>
      <Input
        placeholder="Search by recipe name or health label..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
};
