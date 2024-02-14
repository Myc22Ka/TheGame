import React from "react";
import { GridEntry } from "src/modules/Grid/types";
import { motion } from "framer-motion";
import { gridVariants } from "src/modules/Grid/utils";
import { useScore } from "src/contexts/ScoreContext";
import { Stack } from "react-bootstrap";
import CellPieceServiceDisplay from "./CellPieceServiceDisplay";
import options from "src/config.json";

type CellHeaderPropsType = {
  cell: GridEntry;
};

const CellHeader: React.FC<CellHeaderPropsType> = ({ cell }) => {
  const { currentGameSpeed } = useScore();

  return (
    <motion.div
      initial="inactive"
      variants={gridVariants}
      className="cell-header"
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
        ease: "anticipate",
      }}
      animate={cell.animate}
    >
      <Stack gap={2} className="justify-content-end" direction="horizontal">
        <CellPieceServiceDisplay cell={cell} />
      </Stack>
    </motion.div>
  );
};

export default CellHeader;
