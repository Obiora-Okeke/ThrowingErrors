import Parse from '../parseConfig';

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
  }));
};

export const getRecipeById = async (id) => {
  const Recipe = Parse.Object.extend('Recipes');
  const query = new Parse.Query(Recipe);
  const result = await query.get(id);
  return {
    id: result.id,
    name: result.get('Name'),
    description: result.get('Description'),
    url: result.get('url'),
    author: result.get('Author'),
    ingredients: result.get('Ingredients'),
    method: result.get('Method'),
    pointer: result
  };
};