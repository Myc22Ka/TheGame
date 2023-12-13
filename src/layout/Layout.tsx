import React from "react";
import { useGame } from "../contexts/GameContext";
import GameOver from "./GameOver";
import ShopLayout from "../components/Shop/ShopLayout";
import { Stack } from "react-bootstrap";
import Header from "./Header/Header";
import Gambler from "./Gambler";
import Grid from "../components/Grid/Grid";
import Timer from "./Header/Timer";

const Layout = () => {
  const { game } = useGame();

  return (
    <React.Fragment>
      <Stack direction="horizontal" className="h-100">
        <Stack
          style={{ flex: 1000, paddingRight: "1rem" }}
          direction="vertical"
          className="justify-content-between"
        >
          <Header />
          <Stack direction="horizontal" gap={2}>
            <Gambler />
            <Grid />
          </Stack>
          <Timer />
        </Stack>
        <ShopLayout />
      </Stack>
      {game.gameOver ? <GameOver /> : null}
    </React.Fragment>
  );
};

export default Layout;
