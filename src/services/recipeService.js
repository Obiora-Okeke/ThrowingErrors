import Parse from '../parseConfig';
const Recipe = Parse.Object.extend('Recipe');
const Comment = Parse.Object.extend('Comment');
const Favorite = Parse.Object.extend('Favorite');

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

  export const toggleFavorite = async recipeObj => {
    const user = Parse.User.current();
    const q = new Parse.Query(Favorite);
    q.equalTo('user', user);
    q.equalTo('recipe', recipeObj);
    const existing = await q.first();
    if (existing) {
      await existing.destroy();
      return false;
    } else {
      const fav = new Favorite();
      fav.set('user', user);
      fav.set('recipe', recipeObj);
      await fav.save();
      return true;
    }
  };

   export const getFavorites = async () => {
    const user = Parse.User.current();
    const q = new Parse.Query(Favorite);
    q.equalTo('user', user);
    q.include('recipe');
    const results = await q.find();
    return results.map(fav => fav.get('recipe'));
  };

   export const getComments = async (recipeId) => {
    const q = new Parse.Query(Comment);
    q.equalTo('recipe', { __type: 'Pointer', className: 'Recipes', objectId: recipeId });
    q.include('author');
    const res = await q.find();
    return res.map(c => ({ id: c.id, text: c.get('text'), author: c.get('author').get('username') }));
  };

   export const addComment = async (recipeId, text) => {
    const comment = new Comment();
    comment.set('text', text);
    comment.set('recipe', { __type: 'Pointer', className: 'Recipes', objectId: recipeId });
    comment.set('author', Parse.User.current());
    return comment.save();
  };

