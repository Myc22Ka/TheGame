import React from "react";
import Main from "./Main";
import Header from "./Header";
import { useGameOver } from "../contexts/GameOverContext";
import GameOver from "./GameOver";

const Layout = () => {
  const { isGameOver } = useGameOver();

  return (
    <React.Fragment>
      <Header />
      <Main />
      {isGameOver.gameOver ? <GameOver /> : null}
    </React.Fragment>
  );
};

export default Layout;
