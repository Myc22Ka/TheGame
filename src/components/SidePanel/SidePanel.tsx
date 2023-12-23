import React from "react";
import StatsDisplay from "./StatsDisplay/StatsDisplay";
import Gambler from "../../layout/Gambler";
import { Stack } from "react-bootstrap";
import "../../styles/sidepanel.scss";

const SidePanel: React.FC = () => {
  return (
    <Stack direction="vertical">
      <StatsDisplay />
      <Gambler />
    </Stack>
  );
};

export default SidePanel;
