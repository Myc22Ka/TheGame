import React from "react";
import { Stack } from "react-bootstrap";
import { motion } from "framer-motion";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";
import { useCell } from "src/contexts/CellContext";
import Level from "./Level";

const Levels: React.FC = () => {
  const { currentGameSpeed } = useScore();
  const { cell } = useCell();

  return (
    <motion.div
      initial="inactive"
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
        ease: "anticipate",
        staggerChildren: 0.04,
      }}
      animate={cell.animate}
    >
      <Stack gap={1} direction="horizontal" className="justify-content-center p-2">
        {Array.from({ length: cell.insideCell.upgradeCost.length }, (_, i) => i + 1).map((e) => (
          <Level key={e} e={e} />
        ))}
      </Stack>
    </motion.div>
  );
};

export default Levels;
