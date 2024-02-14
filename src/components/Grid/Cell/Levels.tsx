import React from "react";
import { GridEntry } from "src/modules/Grid/types";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";

type LevelsPropsType = {
  cell: GridEntry;
};
const Levels: React.FC<LevelsPropsType> = ({ cell }) => {
  return (
    <Stack gap={1} direction="horizontal" className="justify-content-center p-2">
      {Array.from({ length: cell.insideCell.upgradeCost.length }, (_, i) => i + 1).map((e) => {
        return (
          <div
            className="level"
            key={e}
            style={{
              opacity: e / cell.insideCell.upgradeCost.length,
              backgroundColor: e <= cell.insideCell.level ? styles[cell.insideCell.rule] : "none",
              border: `2px solid ${styles[cell.insideCell.rule]}`,
            }}
          ></div>
        );
      })}
    </Stack>
  );
};

export default Levels;
