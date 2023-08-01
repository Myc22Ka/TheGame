import React from "react";
import "./styles/App.scss";
import { GameProvider, initState } from "./contexts/GameContext";
import Layout from "./layout/Layout";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameProvider gameOver={initState.gameOver} grid={initState.grid}>
        <Layout />
      </GameProvider>
    </div>
  );
};
export default App;
