import React from "react";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import { motion } from "framer-motion";
import { gridVariants } from "src/modules/Grid/utils";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";
import { useCell } from "src/contexts/CellContext";

const Levels: React.FC = () => {
  const { currentGameSpeed } = useScore();
  const { cell } = useCell();

  return (
    <motion.div
      initial="inactive"
      variants={gridVariants}
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
        ease: "anticipate",
      }}
      animate={cell.animate}
    >
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
    </motion.div>
  );
};

export default Levels;
