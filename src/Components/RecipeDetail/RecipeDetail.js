import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, getFavorites, toggleFavorite, getComments, addComment } from '../../services/recipeService';
import { createReview } from '../../Common/Services/LearnService';
import { checkUser } from "../Auth/AuthService";
import CommentSection from '../UserSubmissions/CommentSection';

const RecipeDetail = () => {
  const { id } = useParams(); // This is the objectId from the URL
  console.log('Recipe ID from URL:', id); // Log the recipe ID
  const [recipe, setRecipe] = useState(null);
  const [recipeRating, setRecipeRating] = useState({ averageRating: 0, totalReviews: 0 });

  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  // State for image upload
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

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
      
      {/* Display overall rating */}
      <div style={{ marginBottom: '1.5em', padding: '1em', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '0.5em' }}>Overall Rating</h4>
        <StarRating 
          rating={recipeRating.averageRating} 
          totalReviews={recipeRating.totalReviews}
          showCount={true}
        />
      </div>
      
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
