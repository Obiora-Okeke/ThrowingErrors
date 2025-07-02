import './App.css';
import Parse from "parse";
import * as Env from "./environments.js"
import Main from "./Components/Main/Main.js";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <Main />;
}

export default App;
