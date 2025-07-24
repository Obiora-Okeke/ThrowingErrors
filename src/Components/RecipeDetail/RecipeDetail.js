import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, getFavorites, toggleFavorite, getComments, addComment } from '../../services/recipeService';
import { createReview } from '../../Common/Services/LearnService';
import { checkUser } from "../Auth/AuthService";
import CommentSection from '../UserSubmissions/CommentSection';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

  const [isFav, setIsFav] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  var recipeID = NaN;

    useEffect(() => {
      getFavorites().then(favs => setIsFav(favs.some(r => r.id === recipeID)));
      getComments(recipeID).then(setComments);
    }, [recipeID]);

  if (!recipe) return <p>Loading...</p>;

  recipeID = recipe.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkUser()) {    
      createReview(recipe.id, rating, feedback);
      alert("Thank you for your review!");
      return;
    }
    alert("Please log in to leave a review");

  };

  const handleToggleFav = async () => {
    const status = await toggleFavorite(recipe);
    setIsFav(status);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(recipe.id, newComment);
    const updated = await getComments(recipe.id);
    setComments(updated);
    setNewComment('');
  };

  return (
    <div>
      <h1>{recipe.name}</h1>
      <button onClick={handleToggleFav}>{isFav ? 'Unfavorite' : 'Favorite'}</button>
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
              onClick={() => setRating(star)}
              style={{
                color: star <= rating ? "gold" : "gray",
                fontSize: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                }}
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
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value)}}
            placeholder="Write your feedback here..."
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Review
        </button>
      </form>

      <CommentSection comments={comments} />
      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Post Comment</button>

    </div>
  );
};

export default RecipeDetail;
