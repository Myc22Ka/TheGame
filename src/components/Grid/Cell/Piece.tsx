import React from "react";
import { motion } from "framer-motion";
import { GridEntry } from "src/modules/Grid/types";
import { gridVariants } from "src/modules/Grid/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";
import { piecesIcons } from "src/modules/Piece/statsIcons";
import { useCell } from "src/contexts/CellContext";

type PiecePropsType = {
  handleShow: () => void;
};

const Piece: React.FC<PiecePropsType> = ({ handleShow }) => {
  const { currentGameSpeed } = useScore();
  const { cell } = useCell();

  return (
    <motion.div
      className={`piece ${cell.insideCell.rule}`}
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
      onClick={handleShow}
    >
      {cell.insideCell.rule !== "default" && <FontAwesomeIcon icon={piecesIcons[cell.insideCell.rule]} size="3x" />}
    </motion.div>
  );
};

export default Piece;
