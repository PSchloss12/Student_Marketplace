import './App.css';
import Parse from "parse";
import * as ENV from "./environment.js"
import Components from './Components/Components.js';

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

function App() {
  return (
    <div className="app-container">
      <Components/>
    </div>
  );
}

export default App;
