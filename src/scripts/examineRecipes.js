import Parse from 'parse';

export const examineRecipes = async () => {
  try {
    const Recipe = Parse.Object.extend('Recipe');
    const query = new Parse.Query(Recipe);
    
    const recipes = await query.find();
    console.log('Found recipes:', recipes.length);
    
    recipes.forEach((recipe, index) => {
      console.log(`Recipe ${index + 1}:`, {
        id: recipe.id,
        name: recipe.get('name'),
        description: recipe.get('description'),
        ingredients: recipe.get('ingredients'),
        instructions: recipe.get('instructions')
      });
    });
    
    return recipes;
  } catch (error) {
    console.error('Error examining recipes:', error);
    throw error;
  }
};
