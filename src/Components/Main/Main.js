import React, { useEffect, useState } from 'react';
import List from '../List/List';
import { getAllRecipes } from '../../Common/Services/Recipes';

const Main = () => {
  const [recipes, setRecipes] = useState([]);

  // UseEffect to run when the page loads to
  // obtain async data and render
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
