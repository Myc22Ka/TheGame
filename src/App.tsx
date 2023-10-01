import React from "react";
import "./styles/App.scss";
import { GameProvider } from "./contexts/GameContext";
import Layout from "./layout/Layout";
import { ScoreProvider } from "./contexts/ScoreContext";
import options from "./config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { initGameState } from "./modules/Piece/utils";
import {
  TrashcanProvider,
  initTrashcanState,
} from "./contexts/TrashcanContext";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameProvider {...initGameState}>
        <ScoreProvider {...options.points}>
          <TrashcanProvider {...initTrashcanState}>
            <Layout />
          </TrashcanProvider>
        </ScoreProvider>
      </GameProvider>
    </div>
  );
};
export default App;
