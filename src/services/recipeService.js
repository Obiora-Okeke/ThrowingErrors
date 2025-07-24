import Parse from '../parseConfig';
const Recipe = Parse.Object.extend('Recipe');

export const getAllRecipes = async () => {
  const Recipe = Parse.Object.extend('Recipes');
  const query = new Parse.Query(Recipe);
  const results = await query.find();
  return results.map(r => ({
    id: r.id,
    name: r.get('Name'),
    description: r.get('Description'),
    url: r.get('url'),
    author: r.get('Author'),
    ingredients: r.get('Ingredients'),
    method: r.get('Method'),
    image: r.get('image'), // Single image for list display
    images: r.get('images') || [], // Multiple images array
  }));
};

export const getRecipeById = async (id) => {
  const Recipe = Parse.Object.extend('Recipes');
  const query = new Parse.Query(Recipe);

  // Include both image fields in the query
  query.include('image');
  query.include('images');

  const result = await query.get(id);
  return {
    id: result.id,
    name: result.get('Name'),
    description: result.get('Description'),
    url: result.get('url'),
    author: result.get('Author'),
    ingredients: result.get('Ingredients'),
    method: result.get('Method'),
    image: result.get('image'), // Single image field
    images: result.get('images') || [], // Multiple images array
    pointer: result,
  };
};



 export const createRecipe = async ({ name, ingredients, description, url, method }) => {
    const recipe = new Recipe();
    recipe.set('Name', name);
    recipe.set('Description', description);
    recipe.set('url', url);
    recipe.set('Method', method);
    recipe.set('Ingredients', ingredients);
    recipe.set('Author', Parse.User.current());
    return recipe.save();
  };

