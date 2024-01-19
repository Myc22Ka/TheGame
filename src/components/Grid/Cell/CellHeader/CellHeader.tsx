import React from "react";
import { GridEntry } from "src/modules/Grid/types";
import { motion } from "framer-motion";
import { gridVariants } from "src/modules/Grid/utils";
import { getPieceTransition } from "src/modules/game_utils";
import { useScore } from "src/contexts/ScoreContext";
import Levels from "./Levels";
import { Stack } from "react-bootstrap";
import CellPieceServiceDisplay from "./CellPieceServiceDisplay";

type CellHeaderPropsType = {
  cell: GridEntry;
};

const CellHeader: React.FC<CellHeaderPropsType> = ({ cell }) => {
  const { score } = useScore();

  return (
    <motion.div
      initial="inactive"
      variants={gridVariants}
      className="levels"
      transition={getPieceTransition(score)}
      animate={cell.animate}
    >
      <Stack gap={2} className="justify-content-between" direction="horizontal">
        <Levels cell={cell} />
        <CellPieceServiceDisplay />
      </Stack>
    </motion.div>
  );
};

export default CellHeader;
