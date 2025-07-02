import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new recipe with Name
export const createRecipe = (Name) => {
  console.log("Creating: ", Name);
  const Recipe = Parse.Object.extend("Recipe");
  const recipe = new Recipe();
  // using setter to UPDATE the object
  recipe.set("name", Name);
  return recipe.save().then((result) => {
    // returns new Recipe object
    return result;
  });
};

// CREATE operation - new recipe with Name
export const createReview = (RecipeID, rating, feedback) => {
  console.log("Creating Review");

  const recipePointer = new Parse.Object("Recipes");
  recipePointer.id = RecipeID;

  const attributes = {
    recipe: recipePointer,  // must be a valid Parse.Object or pointer object
    Rating: rating,
    Feedback: feedback
  };

  const Review = Parse.Object.extend("Review");
  const review = new Review(attributes);
  review.save();
};

// READ operation - get recipe by ID
export const getRecipeById = (id) => {
  const Recipe = Parse.Object.extend("Recipe");
  const query = new Parse.Query(Recipe);
  return query.get(id).then((result) => {
    // return Recipe object with objectId: id
    return result;
  });
};

export const getReviewById = (id) => {
  const Recipe = Parse.Object.extend("Recipe");
  const query = new Parse.Query(Recipe);
  return query.get(id).then((result) => {
    // return Recipe object with objectId: id
    return result;
  });
};

export let Recipes = {};
Recipes.collection = [];

export let Reviews = {};
Recipes.collection = [];

// READ operation - get all recipes in Parse class Recipe
export const getAllRecipes = () => {
  const Recipe = Parse.Object.extend("Recipe");
  const query = new Parse.Query(Recipe);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Recipe objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// DELETE operation - remove recipe by ID
export const removeRecipe = (id) => {
  const Recipe = Parse.Object.extend("Recipe");
  const query = new Parse.Query(Recipe);
  return query.get(id).then((recipe) => {
    recipe.destroy();
  });
};

export const getAllReviews = () => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Review objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// DELETE operation - remove review by ID
export const removeReview = (id) => {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  return query.get(id).then((review) => {
    review.destroy();
  });
};

// export const getArtistById = (id) => {

// }

// export const getAlbumByArtist = (artist) => {
//   const Album = Parse.Object.extend("Album");
//   const query = new Parse.Query(Album);
//   query.equalTo("artist", artist); // not artist id, it's the whole artist parse object
//   return query.find().then(results => results);
//   // [{ParseObject}]
// }
