import React from "react";
import Grid from "./components/Grid";
import "./styles/App.scss";
import Score from "./components/Score";

function App() {
  return (
    <div className="App">
      <Score />
      <Grid />
    </div>
  );
}

export default App;
