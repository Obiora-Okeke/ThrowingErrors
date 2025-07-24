import Parse from '../parseConfig';

// Create a separate RecipeImage class to store images
export const uploadRecipeImage = async (recipeId, imageFile) => {
  try {
    // Save the file first
    await imageFile.save();
    
    // Create a new RecipeImage object instead of modifying the recipe
    const RecipeImage = Parse.Object.extend('RecipeImages');
    const recipeImage = new RecipeImage();
    
    // Set the recipe pointer and image
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    recipeImage.set('recipe', recipePointer);
    recipeImage.set('image', imageFile);
    recipeImage.set('uploadedBy', Parse.User.current());
    recipeImage.set('uploadedAt', new Date());
    
    // Save the RecipeImage object
    const savedImage = await recipeImage.save();
    
    return {
      success: true,
      imageUrl: imageFile.url(),
      imageObject: savedImage
    };
    
  } catch (error) {
    console.error('Error uploading recipe image:', error);
    throw error;
  }
};

// Get all images for a recipe
export const getRecipeImages = async (recipeId) => {
  try {
    const RecipeImage = Parse.Object.extend('RecipeImages');
    const query = new Parse.Query(RecipeImage);
    
    // Create recipe pointer for query
    const recipePointer = new Parse.Object('Recipes');
    recipePointer.id = recipeId;
    
    query.equalTo('recipe', recipePointer);
    query.include('image');
    query.descending('createdAt');
    
    const results = await query.find();
    
    return results.map(result => ({
      id: result.id,
      imageUrl: result.get('image').url(),
      uploadedAt: result.get('uploadedAt'),
      uploadedBy: result.get('uploadedBy')
    }));
    
  } catch (error) {
    console.error('Error fetching recipe images:', error);
    return [];
  }
};
