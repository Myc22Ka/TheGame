import React from "react";
import "./styles/App.scss";
import { GameProvider, initState } from "./contexts/GameContext";
import Layout from "./layout/Layout";
import { ScoreProvider } from "./contexts/ScoreContext";
import options from "./config.json";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameProvider gameOver={initState.gameOver} grid={initState.grid}>
        <ScoreProvider {...options.points}>
          <Layout />
        </ScoreProvider>
      </GameProvider>
    </div>
  );
};
export default App;
