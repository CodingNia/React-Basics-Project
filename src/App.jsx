import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  return (
    <ChakraProvider>
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          goBack={() => setSelectedRecipe(null)}
        />
      ) : (
        <RecipeListPage onSelectRecipe={setSelectedRecipe} />
      )}
    </ChakraProvider>
  );
};
