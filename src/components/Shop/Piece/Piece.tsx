import React from "react";
import { motion } from "framer-motion";
import usePiece from "src/hooks/usePiece";
import { pieceVariants, piecesIcons } from "src/modules/Piece/utils";
import { PieceType } from "src/modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScore } from "src/contexts/ScoreContext";
import options from "src/config.json";

interface PieceProps {
  piece: PieceType;
  animate: "exit" | "";
}

const Piece: React.FC<PieceProps> = ({ piece, animate }) => {
  const { currentGameSpeed } = useScore();
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
        currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        })
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
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
        ease: "anticipate",
      }}
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
