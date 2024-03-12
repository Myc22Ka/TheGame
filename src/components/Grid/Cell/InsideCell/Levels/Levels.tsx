import React from "react";
import { Stack } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCell } from "src/contexts/CellContext";
import Level from "./Level";
import { useScore } from "src/contexts/ScoreContext";

const Levels: React.FC = () => {
  const { cell } = useCell();
  const { score } = useScore();

  return (
    <motion.div
      initial="inactive"
      transition={{
        duration: score.speed.pieceTransition,
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
