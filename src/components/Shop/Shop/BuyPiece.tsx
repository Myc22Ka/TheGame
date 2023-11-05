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

  return (
    <motion.div
      className={`piece ${piece.rule}`}
      drag={score.gold > piece.buy}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
