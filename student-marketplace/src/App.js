import logo from './logo.svg';
import './App.css';
import Main from './Components/Main/Main.js'
import Parse from "parse";
import * as ENV from "./environment.js"

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
