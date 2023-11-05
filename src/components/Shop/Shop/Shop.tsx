import React from "react";
import "../../../styles/shop.scss";
import RandomPieceGen from "../Piece/RandomPieceGen";
import Market from "./Market";

const Shop: React.FC = () => {
  return (
    <div className="shop">
      <RandomPieceGen />
      <Market />
    </div>
  );
};

export default Shop;
