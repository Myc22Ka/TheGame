import React from "react";
import { useCell } from "src/contexts/CellContext";

const Description: React.FC = () => {
  const { cell } = useCell();
  return <div className="piece-description">{cell.insideCell.description}</div>;
};

export default Description;
