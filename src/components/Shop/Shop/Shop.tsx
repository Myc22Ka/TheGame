import React from "react";
import { Stack } from "react-bootstrap";
import "../../../styles/shop.scss";
import RandomPieceGen from "../Piece/RandomPieceGen";
import Market from "./Market";

const Shop: React.FC = () => {
  return (
    <Stack
      direction="vertical"
      gap={2}
      className="shop justify-content-between h-100"
    >
      <RandomPieceGen />
      <Market />
    </Stack>
  );
};

export default Shop;
