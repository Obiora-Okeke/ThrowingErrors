import Parse from '../../parseConfig';

// Create a new review for a recipe
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
    console.log('Review created successfully:', savedReview);
    
    return savedReview;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Get all reviews for a specific recipe
export const getReviews = async (recipeId) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create recipe pointer for query
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    query.include('user');
    
    const reviews = await query.find();
    
    return reviews.map(review => ({
      id: review.id,
      rating: review.get('Rating'),
      feedback: review.get('Feedback'),
      user: review.get('user') ? review.get('user').get('firstName') : 'Anonymous',
      createdAt: review.createdAt
    }));
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
