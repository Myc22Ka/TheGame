import React from "react";
import { useScore } from "src/contexts/ScoreContext";
import { Container, Stack } from "react-bootstrap";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayValue from "./DisplayValue";
import { GameStats } from "src/modules/Game/types";

const StatsDisplay: React.FC = () => {
  const { score } = useScore();

  return (
    <Stack
      direction="vertical"
      gap={1}
      className="stats-display p-2"
      style={{ flex: 0 }}
    >
      <Stack
        className="stats-btn justify-content-start p-1"
        gap={2}
        direction="horizontal"
      >
        <FontAwesomeIcon icon={faSquarePollVertical} />
        <div>Stats Display</div>
      </Stack>
      <Container>
        {Object.entries(score.gameStats).map(([key, value]) => {
          return (
            <DisplayValue key={key} value={value} gameStat={key as GameStats} />
          );
        })}
      </Container>
    </Stack>
  );
};

export default StatsDisplay;
