import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Badge,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectRecipe }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const filteredRecipes = data.hits.filter(({ recipe }) => {
    const nameMatch = recipe.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const healthLabelsMatch = recipe.healthLabels.some((label) =>
      label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return nameMatch || healthLabelsMatch;
  });

  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const dietLabelsToHighlight = ["Vegan", "Vegetarian"];

  return (
    <Box p={6} bgGradient="linear(to-br, teal.100, blue.50)">
      <Text
        fontSize="4xl"
        fontWeight="bold"
        mb={6}
        color="teal.700"
        textAlign="center"
      >
        Recipe Finder
      </Text>
      <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
        <Input
          placeholder="Search recipes by name or label..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          size="lg"
          bg="white"
          border="2px"
          borderColor="teal.400"
          _placeholder={{ color: "gray.400" }}
          _focus={{
            borderColor: "teal.700",
            boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.6)",
          }}
          _hover={{
            borderColor: "teal.500",
          }}
          maxWidth="400px"
        />
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {currentRecipes.map(({ recipe }) => (
          <Box
            key={recipe.label}
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "scale(1.05)",
              transition: "0.3s",
              boxShadow: "xl",
              bg: "teal.50",
            }}
            onClick={() => onSelectRecipe(recipe)}
            cursor="pointer"
          >
            <Image
              src={recipe.image}
              alt={`Image of ${recipe.label}`}
              objectFit="cover"
              height="200px"
              width="100%"
              borderTopRadius="lg"
            />
            <Box p={4} textAlign="center">
              <Text
                fontSize="sm"
                color="gray.500"
                textTransform="uppercase"
                mb={2}
              >
                {recipe.mealType.join(", ")}
              </Text>

              <Text fontWeight="bold" fontSize="xl" color="teal.700" mb={2}>
                {recipe.label}
              </Text>

              <Box mb={2}>
                {recipe.dietLabels && recipe.dietLabels.length > 0 ? (
                  recipe.dietLabels.map((label) => {
                    return dietLabelsToHighlight.includes(label) ? (
                      <Badge key={label} mr={2} colorScheme="purple">
                        {label}
                      </Badge>
                    ) : (
                      <Badge key={label} mr={2} colorScheme="green">
                        {label}
                      </Badge>
                    );
                  })
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No diet labels
                  </Text>
                )}
              </Box>

              <Text fontSize="sm" color="gray.600" mb={2}>
                Dish Type: {recipe.dishType.join(", ")}
              </Text>

              <Box>
                {recipe.cautions.map((caution) => (
                  <Badge key={caution} colorScheme="red" mr={2}>
                    {caution}
                  </Badge>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      {totalRecipes > recipesPerPage && (
        <HStack justifyContent="center" mt={6}>
          <Button
            onClick={goToPreviousPage}
            isDisabled={currentPage === 1}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={goToNextPage}
            isDisabled={currentPage === totalPages}
            colorScheme="teal"
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};
