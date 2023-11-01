import React from "react";
import "../../../styles/shop.scss";
import RandomPieceGen from "../Piece/RandomPieceGen";
import TrashCan from "./TrashCan";
import Market from "./Market";

const Shop: React.FC = () => {
  return (
    <div className="shop">
      <RandomPieceGen />
      {/* <Market /> */}
      <TrashCan />
    </div>
  );
};

export default Shop;
