import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../Common/Services/Recipes';
import { createReview } from '../../services/ratingService';
import { checkUser } from "../Auth/AuthService";
import { uploadRecipeImage, getRecipeImages } from '../../services/imageService';
import { getRecipeRating, StarRating } from '../../services/ratingService';
import Parse from 'parse';

const RecipeDetail = () => {
  const { id } = useParams(); // This is the objectId from the URL
  console.log('Recipe ID from URL:', id); // Log the recipe ID
  const [recipe, setRecipe] = useState(null);
  const [recipeRating, setRecipeRating] = useState({ averageRating: 0, totalReviews: 0 });

  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const [isFavorited, setIsFavorited] = useState(false);
  // State for image upload
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const checkFavoriteStatus = useCallback(async () => {
    const currentUser = Parse.User.current();
    if (!currentUser) return;

    const Favorite = Parse.Object.extend("Favorite");
    const query = new Parse.Query(Favorite);
    query.equalTo("user", currentUser);
    query.equalTo("recipe", new Parse.Object("Recipe").set("objectId", id));

    const result = await query.first();
    setIsFavorited(!!result);
  }, [id]);

  const loadAllImages = useCallback(async () => {
    try {
      // Fetch recipe details using objectId
      const fetchedRecipe = await getRecipeById(id);
      console.log('Fetched Recipe in useEffect:', fetchedRecipe);
      setRecipe(fetchedRecipe);

      // Collect all image URLs
      let allImageUrls = [];

      // If the recipe has images from the recipe object, add them
      if (fetchedRecipe.images && fetchedRecipe.images.length > 0) {
        const recipeImageUrls = fetchedRecipe.images.map((file) => file.url());
        allImageUrls = [...allImageUrls, ...recipeImageUrls];
      }

      // Also fetch images from the separate RecipeImages table
      const recipeImages = await getRecipeImages(id);
      console.log('Fetched Recipe Images:', recipeImages);
      if (recipeImages.length > 0) {
        const additionalUrls = recipeImages.map(img => img.imageUrl);
        allImageUrls = [...allImageUrls, ...additionalUrls];
      }

      // Remove duplicates and set all images at once
      const uniqueImageUrls = [...new Set(allImageUrls)];
      setImageUrls(uniqueImageUrls);

    } catch (error) {
      console.error('Error fetching recipe or images:', error);
    }
  }, [id]);

  const loadRecipeRating = useCallback(async () => {
    try {
      const rating = await getRecipeRating(id);
      setRecipeRating(rating);
    } catch (error) {
      console.error('Error fetching recipe rating:', error);
    }
  }, [id]);

  const loadComments = useCallback(async () => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    query.equalTo("recipe", new Parse.Object("Recipes").set("objectId", id));
    query.include("author");
    query.ascending("createdAt");

    try {
      const results = await query.find();
      setComments(results);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    loadAllImages();
    loadComments();
    loadRecipeRating();
    checkFavoriteStatus();

  }, [loadAllImages, loadRecipeRating, loadComments, checkFavoriteStatus]);

  if (!recipe) return <p>Loading...</p>;

  const toggleFavorite = async () => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      alert("Please log in to favorite recipes.");
      return;
    }

    const Favorite = Parse.Object.extend("Favorite");
    const query = new Parse.Query(Favorite);
    query.equalTo("user", currentUser);
    query.equalTo("recipe", id);

    const existingFavorite = await query.first();

    if (existingFavorite) {
      await existingFavorite.destroy();
      setIsFavorited(false);
      alert("Removed from favorites.");
    } else {
      const favorite = new Favorite();
      favorite.set("user", currentUser);
      favorite.set("recipe", id);
      favorite.set("recipeName", recipe.name)
      await favorite.save();
      setIsFavorited(true);
      alert("Added to favorites!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkUser()) {
      try {
        await createReview(recipe.id, rating, feedback);
        alert("Thank you for your review!");
        
        // Refresh the rating after submitting a new review
        await loadRecipeRating();
        
        // Clear the form
        setRating("");
        setFeedback("");
      } catch (error) {
        console.error('Error submitting review:', error);
        alert("Error submitting review. Please try again.");
      }
      return;
    }
    alert("Please log in to leave a review");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const currentUser = Parse.User.current();
    if (!currentUser) {
      alert("Please log in to post a comment.");
      return;
    }

    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();

    const recipePointer = new Parse.Object("Recipes");
    recipePointer.id = id;

    comment.set("text", commentText);
    comment.set("recipe", recipePointer);
    comment.set("author", currentUser);

    try {
      await comment.save();
      setCommentText("");
      loadComments(); // Refresh comment list
    } catch (error) {
      console.error("Error saving comment:", error);
      alert("Failed to post comment.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    if (!recipe) {
      alert('Recipe data not available. Please refresh the page.');
      return;
    }

    if (!checkUser()) {
      alert('Please log in to upload images.');
      return;
    }
  
    try {
      const parseFile = new Parse.File(file.name, file);
      console.log('Uploading file:', file.name);
      
      // Use the new image service
      const result = await uploadRecipeImage(recipe.id, parseFile);
      
      if (result.success) {
        console.log('Image uploaded successfully:', result);
        
        // Reload all images to prevent duplicates
        await loadAllImages();
        alert('Image uploaded successfully!');
        
        // Clear the file input
        setFile(null);
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    }
  };


  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      
      {/* Display overall rating */}
      <div style={{ marginBottom: '1.5em', padding: '1em', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '0.5em' }}>Overall Rating</h4>
        <StarRating 
          rating={recipeRating.averageRating} 
          totalReviews={recipeRating.totalReviews}
          showCount={true}
        />
      </div>
      <button onClick={toggleFavorite} style={{ marginTop: "1em" }}>
        {isFavorited ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>

      <h4>Ingredients</h4>
      <ul>{recipe.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h4>Method</h4>
      <ol>{recipe.method?.map((m, idx) => <li key={idx}>{m}</li>)}</ol>

      {/* Display all uploaded images */}
      <div>
        <h4>Uploaded Images</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${recipe.name} - ${idx + 1}`} // Removed the word "Image"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />          
          ))}
        </div>
      </div>

      {/* Image upload form */}
      <div>
        <h2>Upload Recipe Image</h2>
        <input 
          type="file" 
          onChange={handleFileChange} 
          value="" 
          key={imageUrls.length} // This will reset the input after successful upload
        />
        <button onClick={handleUpload} style={{ marginTop: '10px' }}>
          Upload Image
        </button>
        {file && <p>Selected: {file.name}</p>}
      </div>

      {/* Review form */}
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
              setFeedback(e.target.value);
            }}
            placeholder="Write your feedback here..."
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Review
        </button>
      </form>
      <div style={{ marginTop: '2em' }}>
  <h2>Leave a Comment</h2>
  <form onSubmit={handleCommentSubmit}>
    <textarea
      rows="4"
      cols="50"
      placeholder="Write your comment..."
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      required
    />
    <br />
    <button type="submit" style={{ marginTop: "10px" }}>Post Comment</button>
  </form>
    </div>

    {/* Display comments */}
    <div style={{ marginTop: '2em' }}>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {comments.map((comment) => (
            <li key={comment.id} style={{ marginBottom: "1em", padding: "1em", backgroundColor: "#f1f1f1", borderRadius: "8px" }}>
              <strong>{comment.get("author")?.get("username") || "Anonymous"}</strong>
              <p>{comment.get("text")}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default RecipeDetail;
