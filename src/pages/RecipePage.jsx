import {
  Box,
  Image,
  Text,
  Button,
  Badge,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";

export const RecipePage = ({ recipe, goBack }) => {
  return (
    <Box bg="blue.50" p={6} minHeight="100vh">
      <Button mb={4} onClick={goBack} colorScheme="blue">
        &#8592; Back
      </Button>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 2fr" }}
        gap={6}
        alignItems="start"
      >
        <GridItem>
          <Image
            src={recipe.image}
            alt={`Image of ${recipe.label}`}
            borderRadius="lg"
            objectFit="cover"
            width="100%"
            maxHeight="400px"
            boxShadow="lg"
          />
        </GridItem>

        <GridItem>
          <VStack align="start" spacing={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              {recipe.label}
            </Text>

            <Text color="gray.600">
              <strong>Total cooking time:</strong> {recipe.totalTime || "N/A"}{" "}
              Minutes
            </Text>
            <Text color="gray.600">
              <strong>Servings:</strong> {recipe.yield}
            </Text>

            <Box>
              <Text fontWeight="bold" color="gray.800" fontSize="lg" mb={2}>
                Health Labels:
              </Text>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {recipe.healthLabels.map((label) => (
                  <Badge key={label} colorScheme="purple" px={2} py={1}>
                    {label}
                  </Badge>
                ))}
              </Box>
            </Box>

            <Box>
              <Text
                fontWeight="bold"
                color="gray.800"
                fontSize="lg"
                mt={4}
                mb={2}
              >
                Diet:
              </Text>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {recipe.dietLabels.map((label) => (
                  <Badge key={label} colorScheme="green" px={2} py={1}>
                    {label}
                  </Badge>
                ))}
              </Box>
            </Box>

            <Text color="gray.600">
              <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
            </Text>
            <Text color="gray.600">
              <strong>Dish Type:</strong> {recipe.dishType.join(", ")}
            </Text>
          </VStack>
        </GridItem>
      </Grid>

      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="gray.800">
          Ingredients
        </Text>
        <VStack align="start" spacing={2}>
          {recipe.ingredientLines.map((line, index) => (
            <Text key={index} color="gray.600">
              - {line}
            </Text>
          ))}
        </VStack>
      </Box>

      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="gray.800">
          Nutritional Information
        </Text>
        <VStack align="start" spacing={2}>
          {Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
            <Text key={key} color="gray.600">
              {nutrient.label}: {nutrient.quantity.toFixed(1)} {nutrient.unit}
            </Text>
          ))}
        </VStack>
      </Box>

      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="gray.800">
          Cautions
        </Text>
        {recipe.cautions.length > 0 ? (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {recipe.cautions.map((caution, index) => (
              <Badge key={index} colorScheme="red" px={2} py={1}>
                {caution}
              </Badge>
            ))}
          </Box>
        ) : (
          <Text color="gray.600">None</Text>
        )}
      </Box>
    </Box>
  );
};
