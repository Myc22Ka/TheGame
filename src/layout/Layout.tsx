import React from "react";
import { useGame } from "src/contexts/GameContext";
import GameOver from "./GameOver";
import ShopLayout from "src/components/Shop/ShopLayout";
import { Stack } from "react-bootstrap";
import Header from "src/components/Header/Header";
import Grid from "src/components/Grid/Grid";
import SidePanel from "src/components/SidePanel/SidePanel";

const Layout = () => {
  const { game } = useGame();

  return (
    <React.Fragment>
      <Stack direction="horizontal" className="h-100">
        <Stack
          style={{ flex: 1000 }}
          direction="vertical"
          className="justify-content-between"
        >
          <Header />
          <Stack direction="horizontal">
            <SidePanel />
            <Grid />
          </Stack>
        </Stack>
        <ShopLayout />
      </Stack>
      {game.gameOver ? <GameOver /> : null}
    </React.Fragment>
  );
};

export default Layout;
