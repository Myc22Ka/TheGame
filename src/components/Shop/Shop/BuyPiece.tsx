import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";
import { PieceType } from "../../../modules/Piece/types";
import { useScore } from "../../../contexts/ScoreContext";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "react-bootstrap";
import styles from "../../../styles/style.module.scss";

type BuyPiecePropsType = {
  piece: PieceType;
};

const BuyPiece: React.FC<BuyPiecePropsType> = ({ piece }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd } = usePiece(piece);
  const { score } = useScore();

  const dragEnd = (e: PointerEvent) => {
    handleDragEnd(e, false);
  };

  if (score.gold < piece.buy)
    return (
      <motion.div className={`piece ${piece.rule} locked`} initial="initial">
        <FontAwesomeIcon icon={faLock} size="2x" style={{ color: "white" }} />
      </motion.div>
    );

  return (
    <motion.div
      className={`piece ${piece.rule}`}
      drag={score.gold > piece.buy}
      onDragStart={() => handleDragStart(false)}
      onDragEnd={dragEnd}
      animate={tile.animate}
      initial="initial"
      variants={{
        ...pieceVariants,
        drag: { ...pieceVariants.drag, ...tile.vector },
        return: { ...pieceVariants.return, ...tile.vector },
      }}
      transition={pieceTransition}
      ref={pieceRef}
    />
  );
};

export default BuyPiece;
