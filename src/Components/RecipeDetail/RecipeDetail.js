import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/recipeService';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    //send this data to the backend
    alert("Thank you for your review!");
  };

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <h4>Ingredients</h4>
      <ul>{recipe.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h4>Method</h4>
      <ol>{recipe.method?.map((m, idx) => <li key={idx}>{m}</li>)}</ol>


      <form onSubmit={handleSubmit} className="review-form">
        <h2>Leave a Review</h2>

        <div className="rating">
          <label>Rating: </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
            >
              ★
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="feedback">Feedback:</label>
          <br />
          <textarea
            id="feedback"
            rows="5"
            cols="40"
            placeholder="Write your feedback here..."
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default RecipeDetail;
