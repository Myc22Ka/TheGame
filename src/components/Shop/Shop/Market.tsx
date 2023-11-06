import React from "react";
import options from "../../../config.json";
import ShopCell from "./ShopCell";
import { Stack } from "react-bootstrap";

const Market: React.FC = () => {
  return (
    <Stack direction="vertical" gap={4} className="justify-content-end">
      <div className="p-5 devider"></div>
      <div
        className="market p-2"
        style={{
          gridTemplateColumns: `repeat(${Math.floor(
            Math.sqrt(options.pieces.types.length)
          )}, 1fr)`,
          gridTemplateRows: `repeat(${Math.floor(
            Math.sqrt(options.pieces.types.length)
          )}, 1fr)`,
        }}
      >
        {options.pieces.types.map((piece, i) => (
          <ShopCell piece={piece} key={i} />
        ))}
      </div>
    </Stack>
  );
};

export default Market;
