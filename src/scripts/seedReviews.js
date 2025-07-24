import Parse from '../parseConfig';

// Sample reviewer names
const reviewerNames = [
  'Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Brown',
  'Alex Thompson', 'Maria Garcia', 'James Wilson', 'Lisa Anderson', 'Ryan Martinez',
  'Amanda Taylor', 'Kevin Lee', 'Rachel Davis', 'Chris Miller', 'Nicole White',
  'Brandon Jones', 'Stephanie Clark', 'Tyler Moore', 'Ashley Lewis', 'Jordan Hall'
];

// Function to create recipe-specific reviews based on actual recipe data
const generateRecipeSpecificReview = (recipe) => {
  const name = recipe.name.toLowerCase();
  const ingredients = recipe.ingredients?.join(' ').toLowerCase() || '';
  const author = recipe.author || 'Unknown';
  
  // Generate rating (mostly positive, 3-5 stars)
  const rating = Math.floor(Math.random() * 3) + 3;
  
  let feedback = '';
  
  // Create specific feedback based on recipe content
  if (name.includes('pasta') || ingredients.includes('pasta') || ingredients.includes('spaghetti')) {
    const pastaReviews = [
      `This pasta recipe is absolutely delicious! The sauce pairs perfectly with the noodles.`,
      `Made this ${recipe.name} last night and it was a huge hit with the family. Perfect al dente pasta!`,
      `Love how easy this pasta dish is to make. The flavors are incredible and it's ready in no time.`,
      `${author}'s pasta recipe is now my go-to weeknight dinner. Simple ingredients, amazing results!`,
      `The pasta was cooked to perfection following these instructions. Will definitely make again!`
    ];
    feedback = pastaReviews[Math.floor(Math.random() * pastaReviews.length)];
    
  } else if (name.includes('chicken') || ingredients.includes('chicken')) {
    const chickenReviews = [
      `This chicken recipe resulted in the most tender, juicy chicken I've ever made!`,
      `${recipe.name} is now my favorite way to prepare chicken. The seasoning is perfect.`,
      `Followed ${author}'s recipe exactly and the chicken turned out amazing. So flavorful!`,
      `Great chicken dish! The meat was perfectly cooked and the flavors were spot on.`,
      `This chicken recipe is a game changer. Easy to follow and absolutely delicious results.`
    ];
    feedback = chickenReviews[Math.floor(Math.random() * chickenReviews.length)];
    
  } else if (name.includes('beef') || ingredients.includes('beef') || name.includes('steak')) {
    const beefReviews = [
      `The beef in this recipe was incredibly tender and full of flavor!`,
      `${recipe.name} is restaurant quality! The beef was cooked to perfection.`,
      `Amazing beef recipe by ${author}. The meat was so tender it fell apart with a fork.`,
      `This beef dish exceeded my expectations. Rich, savory, and absolutely delicious.`,
      `Perfect way to prepare beef. The seasoning and cooking method are spot on.`
    ];
    feedback = beefReviews[Math.floor(Math.random() * beefReviews.length)];
    
  } else if (name.includes('salad') || ingredients.includes('lettuce') || ingredients.includes('greens')) {
    const saladReviews = [
      `Fresh and vibrant salad! The combination of ingredients is perfect.`,
      `This ${recipe.name} is my new favorite salad. So refreshing and healthy.`,
      `Love this salad recipe! The dressing brings all the flavors together beautifully.`,
      `Perfect salad for summer. Light, fresh, and incredibly satisfying.`,
      `${author} created a wonderful salad recipe. Great mix of textures and flavors.`
    ];
    feedback = saladReviews[Math.floor(Math.random() * saladReviews.length)];
    
  } else if (name.includes('soup') || name.includes('broth') || ingredients.includes('broth')) {
    const soupReviews = [
      `This soup is like a warm hug in a bowl. So comforting and delicious!`,
      `${recipe.name} is the perfect comfort food. Rich, flavorful, and satisfying.`,
      `Amazing soup recipe! The broth is incredibly flavorful and the ingredients are perfect.`,
      `This soup warmed my soul. Perfect for cold days and so easy to make.`,
      `${author}'s soup recipe is now a family favorite. Hearty and delicious!`
    ];
    feedback = soupReviews[Math.floor(Math.random() * soupReviews.length)];
    
  } else if (name.includes('christmas')) {
    const christmasReviews = [
      `This ${recipe.name} is the perfect Christmas treat! Rich, festive, and absolutely delicious.`,
      `${author}'s Christmas recipe is now a holiday tradition in our house. Everyone loves it!`,
      `Made this for Christmas and it was the star of the table. So festive and tasty!`,
      `Perfect Christmas recipe! The flavors are so warm and festive, exactly what the holidays need.`,
      `This Christmas dish turned out beautifully. The whole house smelled amazing while cooking!`,
      `${recipe.name} captures the essence of Christmas perfectly. Will definitely make this every year!`,
      `Amazing Christmas recipe! This will be a new holiday tradition for our family.`,
      `The perfect festive dish by ${author}. Everyone at our Christmas dinner loved it!`
    ];
    feedback = christmasReviews[Math.floor(Math.random() * christmasReviews.length)];
    
  } else if (name.includes('cake') || name.includes('dessert') || name.includes('cookie') || name.includes('sweet')) {
    const dessertReviews = [
      `This dessert is absolutely divine! Sweet perfection in every bite.`,
      `${recipe.name} was a huge hit at our dinner party. Everyone asked for the recipe!`,
      `Decadent and delicious! This dessert is the perfect ending to any meal.`,
      `Amazing dessert recipe by ${author}. Not too sweet, just perfectly balanced.`,
      `This dessert turned out beautifully. Rich, satisfying, and absolutely delicious.`
    ];
    feedback = dessertReviews[Math.floor(Math.random() * dessertReviews.length)];
    
  } else if (name.includes('pizza') || (ingredients.includes('cheese') && ingredients.includes('dough'))) {
    const pizzaReviews = [
      `This pizza recipe is better than takeout! The crust is perfect and toppings are amazing.`,
      `${recipe.name} turned out incredible. The homemade pizza was a huge success!`,
      `Love this pizza recipe! The dough was easy to work with and the results were fantastic.`,
      `Perfect pizza night recipe. The whole family loved it and it's now our go-to.`,
      `${author}'s pizza recipe is a winner. Great crust, perfect sauce, and delicious toppings.`
    ];
    feedback = pizzaReviews[Math.floor(Math.random() * pizzaReviews.length)];
    
  } else if (name.includes('bread') || name.includes('baking') || (ingredients.includes('flour') && ingredients.includes('yeast'))) {
    const breadReviews = [
      `This bread recipe produced the most amazing homemade bread! Perfect texture and flavor.`,
      `${recipe.name} turned out beautifully. The bread was soft, fluffy, and delicious.`,
      `Amazing bread recipe! The instructions were clear and the results were perfect.`,
      `This bread is better than store-bought. Fresh, warm, and absolutely delicious.`,
      `${author}'s bread recipe is foolproof. Even as a beginner, I got perfect results!`
    ];
    feedback = breadReviews[Math.floor(Math.random() * breadReviews.length)];
    
  } else if (ingredients.includes('rice') || name.includes('rice')) {
    const riceReviews = [
      `This rice dish is incredibly flavorful! The rice was perfectly cooked and seasoned.`,
      `${recipe.name} is now my favorite rice recipe. So much flavor in every grain.`,
      `Perfect rice dish! The texture was spot on and the flavors were amazing.`,
      `This rice recipe by ${author} is a keeper. Simple ingredients, incredible results.`,
      `Love how this rice turned out. Fluffy, flavorful, and absolutely delicious.`
    ];
    feedback = riceReviews[Math.floor(Math.random() * riceReviews.length)];
    
  } else {
    // Generic positive reviews for recipes that don't fit specific categories
    const genericReviews = [
      `This ${recipe.name} recipe is absolutely delicious! Will definitely make it again.`,
      `Amazing recipe by ${author}! Easy to follow instructions and fantastic results.`,
      `This dish turned out perfectly. The flavors are incredible and it's now a family favorite.`,
      `Love this recipe! Simple ingredients but the taste is restaurant quality.`,
      `${recipe.name} exceeded my expectations. Delicious and easy to make.`,
      `Perfect recipe! Everyone loved it and I got so many compliments.`,
      `This dish is now in my regular rotation. Absolutely delicious and reliable.`,
      `${author} created a wonderful recipe. Clear instructions and amazing flavor.`
    ];
    feedback = genericReviews[Math.floor(Math.random() * genericReviews.length)];
  }
  
  // Sometimes add specific ingredient mentions
  if (recipe.ingredients && recipe.ingredients.length > 0 && Math.random() < 0.3) {
    const randomIngredient = recipe.ingredients[Math.floor(Math.random() * recipe.ingredients.length)];
    const ingredientComments = [
      ` The ${randomIngredient} really makes this dish special.`,
      ` Love how the ${randomIngredient} adds such great flavor.`,
      ` The ${randomIngredient} was the perfect addition to this recipe.`
    ];
    feedback += ingredientComments[Math.floor(Math.random() * ingredientComments.length)];
  }
  
  return {
    rating,
    feedback
  };
};

// Function to create a fake user for reviews
const createFakeUser = async (name) => {
  try {
    const user = new Parse.User();
    const username = name.toLowerCase().replace(' ', '_') + Math.floor(Math.random() * 1000);
    const email = `${username}@example.com`;
    
    user.set('username', username);
    user.set('email', email);
    user.set('password', 'password123');
    user.set('firstName', name.split(' ')[0]);
    user.set('lastName', name.split(' ')[1]);
    
    await user.signUp();
    return user;
  } catch (error) {
    console.log(`User might already exist: ${name}`);
    // Try to find existing user
    const query = new Parse.Query(Parse.User);
    query.contains('firstName', name.split(' ')[0]);
    query.contains('lastName', name.split(' ')[1]);
    const users = await query.find();
    return users[0] || null;
  }
};

// Main function to seed reviews
export const seedReviews = async () => {
  try {
    console.log('Starting to seed reviews...');
    
    // Get all recipes with multiple queries to ensure we get everything
    const Recipe = Parse.Object.extend('Recipes');
    let allRecipes = [];
    let skip = 0;
    const limit = 100; // Parse's default limit
    
    // Fetch recipes in batches to ensure we get all of them
    while (true) {
      const recipeQuery = new Parse.Query(Recipe);
      recipeQuery.limit(limit);
      recipeQuery.skip(skip);
      recipeQuery.ascending('createdAt'); // Consistent ordering
      
      const batch = await recipeQuery.find();
      
      if (batch.length === 0) {
        break; // No more recipes
      }
      
      allRecipes = allRecipes.concat(batch);
      skip += limit;
      
      console.log(`Fetched batch: ${batch.length} recipes (total so far: ${allRecipes.length})`);
      
      if (batch.length < limit) {
        break; // Last batch
      }
    }
    
    const recipes = allRecipes;
    
    console.log(`Found ${recipes.length} recipes`);
    
    if (recipes.length === 0) {
      throw new Error('No recipes found in database. Please add some recipes first.');
    }
    
    // List all recipe names for debugging
    console.log('Recipe names:');
    recipes.forEach((recipe, index) => {
      console.log(`  ${index + 1}. ${recipe.get('Name')} (ID: ${recipe.id})`);
    });
    
    // Create fake users first
    const users = [];
    console.log('Creating fake users...');
    
    for (const name of reviewerNames) {
      try {
        const user = await createFakeUser(name);
        if (user) {
          users.push(user);
          console.log(`  ✓ Created/found user: ${name}`);
        }
      } catch (error) {
        console.log(`  ✗ Error creating user ${name}:`, error.message);
      }
    }
    
    console.log(`Created/found ${users.length} users`);
    
    if (users.length === 0) {
      throw new Error('Could not create any users for reviews.');
    }
    
    // Generate reviews for each recipe
    let totalReviewsCreated = 0;
    const recipesWithReviews = [];
    const recipesWithoutReviews = [];
    
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const recipeName = recipe.get('Name');
      console.log(`\n[${i + 1}/${recipes.length}] Processing: ${recipeName}`);
      
      const recipeData = {
        id: recipe.id,
        name: recipeName,
        description: recipe.get('Description'),
        author: recipe.get('Author'),
        ingredients: recipe.get('Ingredients') || [],
        method: recipe.get('Method') || []
      };
      
      // Generate 8-12 reviews per recipe
      const numReviews = Math.floor(Math.random() * 5) + 8; // 8-12 reviews
      console.log(`  Planning to create ${numReviews} reviews`);
      
      // Ensure we have enough users
      const availableUsers = users.length;
      const actualNumReviews = Math.min(numReviews, availableUsers);
      
      if (actualNumReviews < numReviews) {
        console.log(`  ⚠️ Only ${availableUsers} users available, creating ${actualNumReviews} reviews instead`);
      }
      
      const selectedUsers = [...users].sort(() => 0.5 - Math.random()).slice(0, actualNumReviews);
      
      let reviewsForThisRecipe = 0;
      
      for (let j = 0; j < selectedUsers.length; j++) {
        const user = selectedUsers[j];
        const reviewData = generateRecipeSpecificReview(recipeData);
        
        try {
          const Review = Parse.Object.extend('Review');
          const review = new Review();
          
          review.set('recipe', recipe);
          review.set('Rating', reviewData.rating);
          review.set('Feedback', reviewData.feedback);
          review.set('author', user);
          
          await review.save();
          reviewsForThisRecipe++;
          totalReviewsCreated++;
          
          const userName = `${user.get('firstName')} ${user.get('lastName')}`;
          console.log(`    ✓ [${j + 1}/${selectedUsers.length}] Review by ${userName} (${reviewData.rating}/5)`);
          
        } catch (error) {
          console.log(`    ✗ [${j + 1}/${selectedUsers.length}] Error creating review:`, error.message);
        }
      }
      
      console.log(`  → Successfully created ${reviewsForThisRecipe} reviews for "${recipeName}"`);
      
      if (reviewsForThisRecipe > 0) {
        recipesWithReviews.push(recipeName);
      } else {
        recipesWithoutReviews.push(recipeName);
      }
    }
    
    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('SEEDING COMPLETE - SUMMARY:');
    console.log('='.repeat(60));
    console.log(`Total recipes processed: ${recipes.length}`);
    console.log(`Recipes with reviews: ${recipesWithReviews.length}`);
    console.log(`Recipes without reviews: ${recipesWithoutReviews.length}`);
    console.log(`Total reviews created: ${totalReviewsCreated}`);
    
    if (recipesWithoutReviews.length > 0) {
      console.log('\n❌ RECIPES WITHOUT REVIEWS:');
      recipesWithoutReviews.forEach(name => console.log(`  - ${name}`));
    }
    
    if (recipesWithReviews.length > 0) {
      console.log('\n✅ RECIPES WITH REVIEWS:');
      recipesWithReviews.forEach(name => console.log(`  - ${name}`));
    }
    
    console.log('\n✅ Finished seeding reviews!');
    
    if (recipesWithoutReviews.length > 0) {
      throw new Error(`${recipesWithoutReviews.length} recipes did not get reviews. Check the console for details.`);
    }
    
  } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
};

// Function to clear all existing reviews (optional)
export const clearAllReviews = async () => {
  try {
    console.log('Clearing all existing reviews...');
    
    const Review = Parse.Object.extend('Review');
    const query = new Parse.Query(Review);
    query.limit(1000); // Parse limit
    
    const reviews = await query.find();
    console.log(`Found ${reviews.length} reviews to delete`);
    
    if (reviews.length > 0) {
      await Parse.Object.destroyAll(reviews);
      console.log('✅ All reviews cleared!');
    } else {
      console.log('No reviews found to clear.');
    }
    
  } catch (error) {
    console.error('Error clearing reviews:', error);
    throw error;
  }
};
