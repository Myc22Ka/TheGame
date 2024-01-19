import React from "react";
import { GridEntry } from "src/modules/Grid/types";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";

type LevelsPropsType = {
  cell: GridEntry;
};
const Levels: React.FC<LevelsPropsType> = ({ cell }) => {
  return (
    <Stack gap={2} direction="horizontal">
      {Array.from({ length: cell.insideCell.level }, (_, i) => i + 1).map(
        (e) => {
          return (
            <div
              className="level"
              key={e}
              style={{
                opacity: e / 5,
                backgroundColor: styles[cell.insideCell.rule],
              }}
            ></div>
          );
        }
      )}
    </Stack>
  );
};

export default Levels;
