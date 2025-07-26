// User.js
import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Link } from 'react-router-dom';
import { checkUser } from "../Auth/AuthService";
import { Navigate, useNavigate } from "react-router-dom";
import { createRecipe } from "../../services/recipeService"

const User = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  const check = !checkUser();

  const [favorites, setFavorites] = useState([]);

  const [formData, setFormData] = useState({
    author: '',
    name: '',
    ingredients: '',
    description: '',
    method: '',
  });

  const [RecStatus, setRecStatus] = useState('');

  const handleRecStatusChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format ingredients: comma-separated string -> array
      const formattedIngredients = formData.ingredients
        .split(',')
        .map((item) => item.trim());

      const formattedMethod = formData.method
        .split('.')
        .map((item) => item.trim());

      await createRecipe({
        author: formData.author,
        name: formData.name,
        description: formData.description,
        method: formattedMethod,
        ingredients: formattedIngredients,
      });

      setRecStatus('Recipe uploaded successfully!');
      setFormData({
        author: '',
        name: '',
        ingredients: '',
        description: '',
        method: '',
      });
    } catch (error) {
      console.error('Error uploading recipe:', error);
      setRecStatus(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) return;

      const Favorite = Parse.Object.extend("Favorite");
      const query = new Parse.Query(Favorite);
      query.equalTo("user", currentUser);
      query.include("recipe");
      query.include("recipeName")
      try {
        const results = await query.find();
        setFavorites(results);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserInfo({
        firstName: currentUser.get("firstName"),
        lastName: currentUser.get("lastName"),
        email: currentUser.get("email"),
        // password: currentUser.get("password"), // 🚨 DO NOT DO THIS in production
      });
    }
  }, []);

  return (
    <div>
      {check ? (
        <Navigate to={"/"} replace />
      ) : !userInfo ? (
        <p>Loading user info...</p>
      ) : (
        <div>
          <h2>User</h2>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <hr />
          <div>
            <h3>My Favorite Recipes</h3>
            {favorites.length === 0 ? (
              <p>You have no favorite recipes yet.</p>
            ) : (
              
            <ul>
              {favorites.map((fav) => {
                const recipe = fav.get("recipe");
                const recipeName = fav.get("recipeName");
                console.log(recipe);
                return (
                  <li key={recipe}> 
                    <button onClick={() => navigate(`/recipe/${recipe}`)}>
                      {recipeName}
                    </button>
                  </li>
                );
              })}
            </ul>
            )}
          </div>
          <hr />
          <Link to="/logout">Logout</Link >
        </div>
      )}
         <h2>Upload a New Recipe</h2>
      <form onSubmit={handleRecStatusSubmit}>
        <input
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleRecStatusChange}
          required
        />
        <br />
        <textarea
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleRecStatusChange}
          required
        />
        <br />        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleRecStatusChange}
          required
        />
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleRecStatusChange}
          required
        />
        <br />
        <textarea
          name="method"
          placeholder="Method (separate steps with a period)  "
          value={formData.method}
          onChange={handleRecStatusChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {RecStatus && <p>{RecStatus}</p>}
    </div>
  );
};

export default User;
