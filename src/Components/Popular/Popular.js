import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularRecipes } from '../../services/popularRecipeService';
import './Popular.css';

const Popular = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        setLoading(true);
        const recipes = await getPopularRecipes(5);
        setPopularRecipes(recipes);
        setError(null);
      } catch (err) {
        console.error('Error fetching popular recipes:', err);
        setError('Failed to load popular recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe: recipe.recipe } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="popular-container">
        <div className="popular-header">
          <h1>🏆 Popular Recipes</h1>
          <p>Discover the highest-rated recipes loved by our community</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading popular recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-container">
        <div className="popular-header">
          <h1>🏆 Popular Recipes</h1>
          <p>Discover the highest-rated recipes loved by our community</p>
        </div>
        <div className="error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (popularRecipes.length === 0) {
    return (
      <div className="popular-container">
        <div className="popular-header">
          <h1>🏆 Popular Recipes</h1>
          <p>Discover the highest-rated recipes loved by our community</p>
        </div>
        <div className="no-recipes">
          <h3>No popular recipes yet!</h3>
          <p>Be the first to rate some recipes and help build our popular recipes list.</p>
          <button onClick={() => navigate('/recipes')}>Browse All Recipes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="popular-container">
      <div className="popular-header">
        <h1>🏆 Popular Recipes</h1>
        <p>Discover the top {popularRecipes.length} highest-rated recipes loved by our community</p>
      </div>

      <div className="popular-recipes">
        {popularRecipes.map((recipe, index) => (
          <div 
            key={recipe.id} 
            className="popular-recipe-card"
            onClick={() => handleRecipeClick(recipe)}
          >
            <div className="recipe-rank">
              <span className="rank-number">#{index + 1}</span>
              {index === 0 && <span className="crown">👑</span>}
            </div>
            
            <div className="recipe-content">
              <div className="recipe-info">
                <h3 className="recipe-name">{recipe.name}</h3>
                <p className="recipe-author">by {recipe.author}</p>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-stats">
                  <div className="rating-display">
                    <div className="stars">
                      {renderStars(recipe.averageRating)}
                    </div>
                    <span className="rating-text">
                      {recipe.averageRating}/5 ({recipe.reviewCount} review{recipe.reviewCount !== 1 ? 's' : ''})
                    </span>
                  </div>
                  
                  <div className="recipe-meta">
                    <span className="ingredient-count">
                      {recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? 's' : ''}
                    </span>
                    <span className="method-count">
                      {recipe.method.length} step{recipe.method.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="recipe-preview">
                <h4>Key Ingredients:</h4>
                <ul className="ingredient-preview">
                  {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <li className="more-ingredients">
                      +{recipe.ingredients.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="recipe-actions">
              <button className="view-recipe-btn">
                View Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="popular-footer">
        <p>Want to see more recipes? <button onClick={() => navigate('/recipes')} className="link-button">Browse all recipes</button></p>
      </div>
    </div>
  );
};

export default Popular;
