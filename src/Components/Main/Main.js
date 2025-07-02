import {
  useEffect,
  useState,
} from "react";
import { Recipes } from "../../Common/Services/LearnService.js";
import MainList from "../List/List.js";
import Parse from "parse";

const Main = () => {
  //parent component
  const [recipes, setRecipes] = useState([]);

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    if (Recipes.collection.length) {
        console.log(recipes);
      setRecipes(Recipes.collection); 
    } else {
      const Recipe = Parse.Object.extend("Recipes")
      const query = new Parse.Query(Recipe);
      query.find().then((recipes) => {
        console.log(recipes);
        setRecipes(recipes);
      });
    }
  }, []);

  //Based on the example provided at https://react.dev/reference/react-dom/components/form
  //Basically just a function to handle searches in lieu of actually knowing how
  //Just sends submitting searches to an alert (event up)
  function search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }

  //WIP
  return (
    <div>
      <h1>Feature 4 - Throwing Errors</h1>
      <h3>Obiora Okeke, Benjamin Pable</h3>
      <p>
        Welcome to our site! <br />
        This is supposed to be a "cookbook" type site, displaying recipes. User
        will be able to search for recipes, as well as leave ratings. <br />
        <br />
        We'll probably hold off on including entire recipes or including all
        recipes until this project is more fleshed out (for readability). They
        are available in the .json's though! <br />
        <br />
        <a href="https://frosch.cosy.sbg.ac.at/datasets/json/recipes"
          >Source for recipes.json</a
        >
      </p>
      <form onSubmit={search}>
        <input name="query" placeholder="Search recipes..." />
        <button type="submit">Search</button>
      </form>

      <div> {MainList(recipes)} </div>
    </div>
  );
};

export default Main;
