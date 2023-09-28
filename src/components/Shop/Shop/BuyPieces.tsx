import React from "react";
import options from "../../../config.json";
import Piece from "../Piece/Piece";
import { PieceType } from "../../../contexts/GameContext";
import { useScore } from "../../../contexts/ScoreContext";
import BuyPiece from "./BuyPiece";

const BuyPieces: React.FC = () => {
  const { removeSomeGold, score } = useScore();

  const handleBuyPiece = (piece: PieceType) => {
    if (score.gold >= piece.buy) removeSomeGold(piece.buy);
  };

  return options.pieces.types.map((piece: PieceType) => (
    <div key={piece.rule} onClick={() => handleBuyPiece(piece)}>
      <BuyPiece piece={piece} />
      <div>${piece.buy}</div>
    </div>
  ));
};

export default BuyPieces;