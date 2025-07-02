import React, { useEffect, useState } from 'react';
import List from '../List/List';
import { getAllRecipes } from '../../services/recipeService';

const Main = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then(setRecipes);
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <List items={recipes} />
    </div>
  );
};

export default Main;