import React from "react";
import "../../../styles/shop.scss";
import RandomPieceGen from "../Piece/RandomPieceGen";
import TrashCan from "./TrashCan";
import BuyPieces from "./BuyPieces";

const Shop: React.FC = () => {
  return (
    <div className="shop">
      <RandomPieceGen />
      {/* <BuyPieces /> */}
      <TrashCan />
    </div>
  );
};

export default Shop;
