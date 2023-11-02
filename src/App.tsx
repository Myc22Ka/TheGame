import React from "react";
import "./styles/App.scss";
import { GameProvider, initGameState } from "./contexts/GameContext";
import Layout from "./layout/Layout";
import { ScoreProvider } from "./contexts/ScoreContext";
import options from "./config.json";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameProvider {...initGameState}>
        <ScoreProvider {...options.points}>
          <Layout />
        </ScoreProvider>
      </GameProvider>
    </div>
  );
};
export default App;
