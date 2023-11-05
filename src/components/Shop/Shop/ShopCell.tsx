import React from "react";
import { Stack } from "react-bootstrap";
import BuyPiece from "./BuyPiece";
import { PieceType } from "../../../modules/Piece/types";
import { useScore } from "../../../contexts/ScoreContext";

type ShopCellProps = {
  piece: PieceType;
};

const ShopCell: React.FC<ShopCellProps> = ({ piece }) => {
  const { score } = useScore();

  return (
    <Stack
      direction="horizontal"
      style={{ margin: "1px" }}
      className={`justify-content-center align-items-center py-3 px-2 cell${
        score.gold < piece.buy ? " locked" : ""
      }`}
    >
      <BuyPiece piece={piece} />
      <div className="h4 m-0 price">{piece.buy}</div>
    </Stack>
  );
};

export default ShopCell;
