import React from "react";
import { useGame } from "../contexts/GameContext";
import GameOver from "./GameOver";
import Shop from "../components/Shop/Shop/Shop";
import { Stack } from "react-bootstrap";
import Header from "../components/Shop/Header/Header";
import Gambler from "./Gambler";
import Grid from "../components/Grid/Grid";
import Timer from "../components/Shop/Header/Timer";

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
        <Shop />
      </Stack>
      {game.gameOver ? <GameOver /> : null}
      {/* <Shop /> */}
    </React.Fragment>
  );
};

export default Layout;
