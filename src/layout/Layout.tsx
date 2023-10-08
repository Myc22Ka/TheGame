import React from "react";
import Main from "./Main";
import Header from "../components/Shop/Header/Header";
import { useGame } from "../contexts/GameContext";
import GameOver from "./GameOver";

const Layout = () => {
  const { game } = useGame();

  return (
    <React.Fragment>
      <Header />
      <Main />
      {game.gameOver ? <GameOver /> : null}
    </React.Fragment>
  );
};

export default Layout;
