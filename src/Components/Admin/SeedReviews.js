import React, { useState } from 'react';
import { seedReviews, clearAllReviews } from '../../scripts/seedReviews';
import { examineRecipes } from '../../scripts/examineRecipes';

const SeedReviews = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isExamining, setIsExamining] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedReviews = async () => {
    setIsSeeding(true);
    setMessage('Starting to seed reviews...');
    
    try {
      await seedReviews();
      setMessage('✅ Successfully seeded reviews for all recipes!');
    } catch (error) {
      setMessage(`❌ Error seeding reviews: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearReviews = async () => {
    if (!window.confirm('Are you sure you want to clear ALL existing reviews? This cannot be undone.')) {
      return;
    }
    
    setIsClearing(true);
    setMessage('Clearing all reviews...');
    
    try {
      await clearAllReviews();
      setMessage('✅ Successfully cleared all reviews!');
    } catch (error) {
      setMessage(`❌ Error clearing reviews: ${error.message}`);
    } finally {
      setIsClearing(false);
    }
  };

  const handleExamineRecipes = async () => {
    setIsExamining(true);
    setMessage('Examining recipes in database...');
    
    try {
      const recipes = await examineRecipes();
      let output = `📊 Found ${recipes.length} recipes:\n\n`;
      
      recipes.forEach((recipe, index) => {
        output += `${index + 1}. ${recipe.name}\n`;
        output += `   Description: ${recipe.description || 'No description'}\n`;
        output += `   Author: ${recipe.author || 'Unknown'}\n`;
        
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          output += `   Ingredients: ${recipe.ingredients.slice(0, 3).join(', ')}${recipe.ingredients.length > 3 ? '...' : ''}\n`;
        }
        
        if (recipe.method && recipe.method.length > 0) {
          output += `   Method steps: ${recipe.method.length} steps\n`;
        }
        
        output += '\n';
      });
      
      setMessage(output);
    } catch (error) {
      setMessage(`❌ Error examining recipes: ${error.message}`);
    } finally {
      setIsExamining(false);
    }
  };

  return (
    <div style={{ padding: '2em', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Review Management</h2>
      <p>Use these tools to manage fake reviews for testing the rating system.</p>
      
      <div style={{ marginBottom: '2em' }}>
        <h3>Examine Recipes</h3>
        <p>First, let's see what recipes are in your database to create accurate reviews.</p>
        <button 
          onClick={handleExamineRecipes}
          disabled={isSeeding || isClearing || isExamining}
          style={{
            padding: '1em 2em',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isExamining ? 'not-allowed' : 'pointer',
            opacity: isExamining ? 0.6 : 1,
            marginRight: '1em'
          }}
        >
          {isExamining ? 'Examining...' : 'Examine Recipes'}
        </button>
      </div>

      <div style={{ marginBottom: '2em' }}>
        <h3>Seed Fake Reviews</h3>
        <p>This will create 8-12 realistic reviews for each recipe in your database.</p>
        <button 
          onClick={handleSeedReviews}
          disabled={isSeeding || isClearing || isExamining}
          style={{
            padding: '1em 2em',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSeeding ? 'not-allowed' : 'pointer',
            opacity: isSeeding ? 0.6 : 1
          }}
        >
          {isSeeding ? 'Seeding Reviews...' : 'Seed Reviews'}
        </button>
      </div>

      <div style={{ marginBottom: '2em' }}>
        <h3>Clear All Reviews</h3>
        <p style={{ color: '#d32f2f' }}>⚠️ This will permanently delete ALL reviews from the database.</p>
        <button 
          onClick={handleClearReviews}
          disabled={isSeeding || isClearing}
          style={{
            padding: '1em 2em',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isClearing ? 'not-allowed' : 'pointer',
            opacity: isClearing ? 0.6 : 1
          }}
        >
          {isClearing ? 'Clearing Reviews...' : 'Clear All Reviews'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '1em',
          backgroundColor: message.includes('❌') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('❌') ? '#f44336' : '#4CAF50'}`,
          borderRadius: '4px',
          marginTop: '1em'
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</pre>
        </div>
      )}

      <div style={{ marginTop: '2em', padding: '1em', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h4>How it works:</h4>
        <ul>
          <li><strong>Fake Users:</strong> Creates 20 realistic reviewer profiles</li>
          <li><strong>Smart Reviews:</strong> Generates reviews tailored to each recipe type (pasta, chicken, desserts, etc.)</li>
          <li><strong>Realistic Ratings:</strong> Mostly positive ratings (3-5 stars) with varied feedback</li>
          <li><strong>Recipe-Specific:</strong> Reviews mention specific aspects of each recipe</li>
        </ul>
      </div>
    </div>
  );
};

export default SeedReviews;
