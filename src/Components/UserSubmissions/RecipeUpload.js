import React, { useState } from 'react';
import recipeService from '../services/recipeService';

const RecipeUpload = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.createRecipe({ title, ingredients, instructions });
      alert('Recipe uploaded!');
      setTitle(''); setIngredients(''); setInstructions('');
    } catch (err) {
      console.error(err);
      alert('Error uploading recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <h2>Upload Recipe</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients" required />
      <textarea value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Instructions" required />
      <button type="submit">Upload</button>
    </form>
  );
};
export default RecipeUpload;
