import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { useScore } from "src/contexts/ScoreContext";
import { statsIcons } from "src/modules/Piece/utils";
import styles from "src/styles/style.module.scss";

const Power = () => {
  const { score } = useScore();
  return (
    <Stack
      className="justify-content-center align-items-center"
      direction="horizontal"
      gap={2}
    >
      <div
        className="h2 m-0"
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: styles.font,
        }}
      >
        {score.gameStats.power}
      </div>
      <FontAwesomeIcon
        icon={statsIcons.find((e) => e.rule === "power")!.icon}
        size="xl"
        color={styles.main}
      />
    </Stack>
  );
};

export default Power;
