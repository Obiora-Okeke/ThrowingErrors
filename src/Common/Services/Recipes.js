import Parse from '../../parseConfig';

// Get all recipes
export const getAllRecipes = async () => {
  try {
    const Recipe = Parse.Object.extend('Recipes');
    const query = new Parse.Query(Recipe);
    
    const recipes = await query.find();
    
    return recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.get('Name'),
      author: recipe.get('Author'),
      description: recipe.get('Description'),
      ingredients: recipe.get('Ingredients'),
      method: recipe.get('Method'),
      prepTime: recipe.get('PrepTime'),
      cookTime: recipe.get('CookTime'),
      servings: recipe.get('Servings'),
      difficulty: recipe.get('Difficulty'),
      cuisine: recipe.get('Cuisine'),
      image: recipe.get('Image'),
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    }));
    
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

// Get a single recipe by ID
export const getRecipeById = async (recipeId) => {
  try {
    const Recipe = Parse.Object.extend('Recipes');
    const query = new Parse.Query(Recipe);
    
    const recipe = await query.get(recipeId);
    
    return {
      id: recipe.id,
      name: recipe.get('Name'),
      description: recipe.get('Description'),
      ingredients: recipe.get('Ingredients'),
      instructions: recipe.get('Instructions'),
      prepTime: recipe.get('PrepTime'),
      cookTime: recipe.get('CookTime'),
      servings: recipe.get('Servings'),
      difficulty: recipe.get('Difficulty'),
      cuisine: recipe.get('Cuisine'),
      image: recipe.get('Image'),
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    };
    
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

// Search recipes by name or cuisine
export const searchRecipes = async (searchTerm) => {
  try {
    const Recipe = Parse.Object.extend('Recipes');
    const nameQuery = new Parse.Query(Recipe);
    const cuisineQuery = new Parse.Query(Recipe);
    
    nameQuery.contains('Name', searchTerm);
    cuisineQuery.contains('Cuisine', searchTerm);
    
    const mainQuery = Parse.Query.or(nameQuery, cuisineQuery);
    const recipes = await mainQuery.find();
    
    return recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.get('Name'),
      description: recipe.get('Description'),
      ingredients: recipe.get('Ingredients'),
      instructions: recipe.get('Instructions'),
      prepTime: recipe.get('PrepTime'),
      cookTime: recipe.get('CookTime'),
      servings: recipe.get('Servings'),
      difficulty: recipe.get('Difficulty'),
      cuisine: recipe.get('Cuisine'),
      image: recipe.get('Image'),
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    }));
    
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};
