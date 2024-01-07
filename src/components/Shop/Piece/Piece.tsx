import React, { useEffect } from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { pieceVariants, piecesIcons } from "../../../modules/Piece/utils";
import { PieceType } from "../../../modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPieceTransition } from "../../../modules/game_utils";
import { useScore } from "../../../contexts/ScoreContext";

interface PieceProps {
  piece: PieceType;
  animate: "exit" | "";
}

const Piece: React.FC<PieceProps> = ({ piece, animate }) => {
  const { score } = useScore();
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEnd,
    addToGrid,
    changePieceAnimation,
  } = usePiece(piece);

  const animationCompleteHandle = () => {
    if (animate === "exit") changePieceAnimation("exit");
    if (tile.animate === "drag") {
      addToGrid();
    }
    if (tile.animate === "return") {
      changePieceAnimation("return");
      setTimeout(
        () => changePieceAnimation("inactive"),
        getPieceTransition(score).duration
      );
    }
  };

  return (
    <motion.div
      className={`piece ${piece.rule}`}
      drag={["active", "inactive"].includes(tile.animate)}
      onDragStart={handleDragStart}
      onDragEnd={(e) => handleDragEnd(e, false)}
      animate={animate || tile.animate}
      initial="initial"
      variants={{
        ...pieceVariants,
        drag: { ...pieceVariants.drag, ...tile.vector },
        return: { ...pieceVariants.return, ...tile.vector },
      }}
      transition={getPieceTransition(score)}
      onAnimationComplete={animationCompleteHandle}
      ref={pieceRef}
    >
      <FontAwesomeIcon
        icon={piecesIcons.find((e) => e.rule === piece.rule)!.icon}
        size="3x"
      />
    </motion.div>
  );
};

export default Piece;
