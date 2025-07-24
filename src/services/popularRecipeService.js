import Parse from '../parseConfig';

export const getPopularRecipes = async (limit = 5) => {
  try {
    // Get all recipes
    const Recipe = Parse.Object.extend('Recipes');
    const recipeQuery = new Parse.Query(Recipe);
    recipeQuery.limit(1000); // Get all recipes
    const recipes = await recipeQuery.find();

    if (recipes.length === 0) {
      return [];
    }

    // Get all reviews
    const Review = Parse.Object.extend('Review');
    const reviewQuery = new Parse.Query(Review);
    reviewQuery.include('recipe');
    reviewQuery.limit(1000); // Get all reviews
    const reviews = await reviewQuery.find();

    // Calculate average ratings for each recipe
    const recipeRatings = {};
    const recipeCounts = {};

    // Initialize all recipes with 0 rating and 0 count
    recipes.forEach(recipe => {
      recipeRatings[recipe.id] = 0;
      recipeCounts[recipe.id] = 0;
    });

    // Sum up ratings for each recipe
    reviews.forEach(review => {
      const recipeId = review.get('recipe').id;
      const rating = review.get('Rating');
      
      if (recipeRatings[recipeId] !== undefined) {
        recipeRatings[recipeId] += rating;
        recipeCounts[recipeId] += 1;
      }
    });

    // Calculate average ratings and create recipe objects with ratings
    const recipesWithRatings = recipes.map(recipe => {
      const recipeId = recipe.id;
      const totalRating = recipeRatings[recipeId];
      const reviewCount = recipeCounts[recipeId];
      const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

      return {
        id: recipe.id,
        name: recipe.get('Name'),
        description: recipe.get('Description'),
        author: recipe.get('Author'),
        ingredients: recipe.get('Ingredients') || [],
        method: recipe.get('Method') || [],
        url: recipe.get('url'),
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        reviewCount: reviewCount,
        recipe: recipe // Include the original Parse object for navigation
      };
    });

    // Filter out recipes with no reviews and sort by average rating (descending)
    const popularRecipes = recipesWithRatings
      .filter(recipe => recipe.reviewCount > 0)
      .sort((a, b) => {
        // First sort by average rating (descending)
        if (b.averageRating !== a.averageRating) {
          return b.averageRating - a.averageRating;
        }
        // If ratings are equal, sort by review count (descending)
        return b.reviewCount - a.reviewCount;
      })
      .slice(0, limit);

    console.log('Popular recipes calculated:', popularRecipes.map(r => ({
      name: r.name,
      rating: r.averageRating,
      reviews: r.reviewCount
    })));

    return popularRecipes;

  } catch (error) {
    console.error('Error fetching popular recipes:', error);
    throw error;
  }
};

export const getRecipeRating = async (recipeId) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create a pointer to the recipe
    const Recipe = Parse.Object.extend('Recipes');
    const recipePointer = new Recipe();
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    const reviews = await query.find();

    if (reviews.length === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.get('Rating'), 0);
    const averageRating = totalRating / reviews.length;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length
    };

  } catch (error) {
    console.error('Error calculating recipe rating:', error);
    return { averageRating: 0, reviewCount: 0 };
  }
};
