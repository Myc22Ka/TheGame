import React from "react";
import { Stack } from "react-bootstrap";
import { motion } from "framer-motion";
import { PieceType } from "../../../modules/Piece/types";
import { useScore } from "../../../contexts/ScoreContext";
import usePiece from "../../../hooks/usePiece";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";
import options from "../../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Info from "./Info";

type BuyPieceProps = {
  piece: PieceType;
  changeMarketState: (newMarketState: PieceType) => void;
};

const BuyPiece: React.FC<BuyPieceProps> = ({ piece, changeMarketState }) => {
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEndWithSell,
    addToGrid,
    unlockPiece,
    resetValues,
  } = usePiece(piece);
  const { score } = useScore();

  const decreasePieceUse = (piece: PieceType) => {
    return { ...piece, uses: piece.uses - 1 };
  };

  const animationCompleteHandle = () => {
    if (tile.animate === "drag") {
      addToGrid();
      changeMarketState(decreasePieceUse(piece));
      setTimeout(resetValues, 500);
    }
    if (["return", "reset"].includes(tile.animate)) {
      unlockPiece();
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-center align-items-center cell p-5${
        (score.gold < piece.buy || piece.uses === 0) && tile.animate !== "drag"
          ? " locked"
          : ""
      } ${tile.animate}`}
    >
      <motion.div
        className={`piece ${piece.rule}`}
        drag={
          score.gold > piece.buy &&
          piece.uses !== 0 &&
          ["active", "inactive"].includes(tile.animate)
        }
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndWithSell}
        animate={tile.animate}
        initial="inactive"
        variants={{
          ...pieceVariants,
          drag: { ...pieceVariants.drag, ...tile.vector },
          return: { ...pieceVariants.return, ...tile.vector },
          reset: {
            ...pieceVariants.reset,
            x: [0, tile.vector.x],
            y: [0, tile.vector.y],
          },
        }}
        transition={pieceTransition}
        onAnimationComplete={animationCompleteHandle}
        ref={pieceRef}
      />
      <Info piece={piece} />
      <div className="h6 m-0 uses py-1 px-3">
        {piece.uses}/{options.pieces.types.find((e) => e.id === piece.id)?.uses}
      </div>
      <div className="h6 m-0 price py-1 px-3">
        {piece.buy} <FontAwesomeIcon icon={faCoins} size="sm" />
      </div>
    </Stack>
  );
};

export default BuyPiece;
