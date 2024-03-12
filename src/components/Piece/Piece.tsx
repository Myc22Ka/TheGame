import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";
import { piecesIcons } from "src/modules/Piece/statsIcons";
import { useCell } from "src/contexts/CellContext";
import { PieceType } from "src/modules/Piece/types";
import { emptyPiece } from "src/modules/Game/emptyPiece";
import { emptyCell } from "src/modules/Game/emptyCell";
import { scale } from "../Animations/Variants/scale";

type PiecePropsType = {
  piece?: PieceType;
  show?: boolean;
};

const Piece: React.FC<PiecePropsType> = ({ piece = emptyPiece, show = false }) => {
  const { cell } = useCell();
  const { score } = useScore();
  const motionProps = {
    initial: "inactive",
    variants: scale,
    transition: {
      duration: score.speed.pieceTransition,
      ease: "anticipate",
    },
    animate: show ? "active" : cell !== emptyCell ? cell.animate : "inactive",
    className: `piece ${cell !== emptyCell ? cell.insideCell.rule : piece.rule}`,
  };

  return (
    <motion.div {...motionProps}>
      {(cell !== emptyCell && cell.insideCell.rule !== "default") || piece.rule !== "default" ? (
        <FontAwesomeIcon icon={piecesIcons[cell !== emptyCell ? cell.insideCell.rule : piece.rule]} size="3x" />
      ) : null}
    </motion.div>
  );
};

export default Piece;
