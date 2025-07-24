import Parse from '../../parseConfig';

// Get all reviews for a specific recipe
export const getReviewsForRecipe = async (recipeId) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create recipe pointer for query
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    query.include('user');
    query.descending('createdAt');
    
    const reviews = await query.find();
    
    return reviews.map(review => ({
      id: review.id,
      rating: review.get('Rating'),
      feedback: review.get('Feedback'),
      user: review.get('user') ? {
        id: review.get('user').id,
        firstName: review.get('user').get('firstName'),
        lastName: review.get('user').get('lastName')
      } : null,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
    
  } catch (error) {
    console.error('Error fetching reviews for recipe:', error);
    return [];
  }
};

// Create a new review
export const createReview = async (recipeId, rating, feedback) => {
  try {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      throw new Error('User must be logged in to create a review');
    }

    const Review = Parse.Object.extend('Review');
    const review = new Review();
    
    // Create recipe pointer
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    review.set('recipe', recipePointer);
    review.set('Rating', parseInt(rating));
    review.set('Feedback', feedback);
    review.set('user', currentUser);
    
    const savedReview = await review.save();
    
    // Return the review with user info
    return {
      id: savedReview.id,
      rating: savedReview.get('Rating'),
      feedback: savedReview.get('Feedback'),
      user: {
        id: currentUser.id,
        firstName: currentUser.get('firstName'),
        lastName: currentUser.get('lastName')
      },
      createdAt: savedReview.createdAt,
      updatedAt: savedReview.updatedAt
    };
    
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Update an existing review
export const updateReview = async (reviewId, rating, feedback) => {
  try {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      throw new Error('User must be logged in to update a review');
    }

    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    const review = await query.get(reviewId);
    
    // Check if the current user owns this review
    if (review.get('user').id !== currentUser.id) {
      throw new Error('You can only update your own reviews');
    }
    
    review.set('Rating', parseInt(rating));
    review.set('Feedback', feedback);
    
    const updatedReview = await review.save();
    
    return {
      id: updatedReview.id,
      rating: updatedReview.get('Rating'),
      feedback: updatedReview.get('Feedback'),
      user: {
        id: currentUser.id,
        firstName: currentUser.get('firstName'),
        lastName: currentUser.get('lastName')
      },
      createdAt: updatedReview.createdAt,
      updatedAt: updatedReview.updatedAt
    };
    
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      throw new Error('User must be logged in to delete a review');
    }

    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    const review = await query.get(reviewId);
    
    // Check if the current user owns this review
    if (review.get('user').id !== currentUser.id) {
      throw new Error('You can only delete your own reviews');
    }
    
    await review.destroy();
    
    return { success: true };
    
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Get average rating for a recipe
export const getAverageRating = async (recipeId) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create recipe pointer for query
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    
    const reviews = await query.find();
    
    if (reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.get('Rating'), 0);
    const average = totalRating / reviews.length;
    
    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal place
      count: reviews.length
    };
    
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return { average: 0, count: 0 };
  }
};
