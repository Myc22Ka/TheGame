import React from "react";
import "./styles/App.scss";
import { GameOverProvider, initState } from "./contexts/GameOverContext";
import Layout from "./layout/Layout";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameOverProvider gameOver={initState.gameOver}>
        <Layout />
      </GameOverProvider>
    </div>
  );
};
export default App;
