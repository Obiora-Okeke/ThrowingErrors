import Parse from '../parseConfig';

// Get all reviews for a specific recipe and calculate average rating
export const getRecipeRating = async (recipeId) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create recipe pointer for query
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    
    const reviews = await query.find();
    
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0
      };
    }
    
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => {
      return sum + review.get('Rating');
    }, 0);
    
    const averageRating = totalRating / reviews.length;
    
    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length
    };
    
  } catch (error) {
    console.error('Error fetching recipe rating:', error);
    return {
      averageRating: 0,
      totalReviews: 0
    };
  }
};

// Get ratings for multiple recipes at once
export const getMultipleRecipeRatings = async (recipeIds) => {
  try {
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    
    // Create recipe pointers for all recipe IDs
    const recipePointers = recipeIds.map(id => {
      const pointer = new Parse.Object('Recipes');
      pointer.id = id;
      return pointer;
    });
    
    query.containedIn('recipe', recipePointers);
    
    const allReviews = await query.find();
    
    // Group reviews by recipe ID
    const reviewsByRecipe = {};
    
    allReviews.forEach(review => {
      const recipeId = review.get('recipe').id;
      if (!reviewsByRecipe[recipeId]) {
        reviewsByRecipe[recipeId] = [];
      }
      reviewsByRecipe[recipeId].push(review);
    });
    
    // Calculate ratings for each recipe
    const ratings = {};
    
    recipeIds.forEach(recipeId => {
      const reviews = reviewsByRecipe[recipeId] || [];
      
      if (reviews.length === 0) {
        ratings[recipeId] = {
          averageRating: 0,
          totalReviews: 0
        };
      } else {
        const totalRating = reviews.reduce((sum, review) => {
          return sum + review.get('Rating');
        }, 0);
        
        const averageRating = totalRating / reviews.length;
        
        ratings[recipeId] = {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: reviews.length
        };
      }
    });
    
    return ratings;
    
  } catch (error) {
    console.error('Error fetching multiple recipe ratings:', error);
    return {};
  }
};

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

// Component to display star rating
export const StarRating = ({ rating, totalReviews, showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
      <div style={{ display: 'flex', color: '#ffd700' }}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && <span>☆</span>}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} style={{ color: '#ddd' }}>★</span>
        ))}
      </div>
      
      {showCount && (
        <span style={{ fontSize: '0.9em', color: '#666' }}>
          {rating > 0 ? `${rating}/5` : 'No ratings'} 
          {totalReviews > 0 && ` (${totalReviews} review${totalReviews !== 1 ? 's' : ''})`}
        </span>
      )}
    </div>
  );
};
