import React, { useRef } from "react";
import { Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import styles from "src/styles/style.module.scss";

const CombosDisplay: React.FC = () => {
  const { cell } = useCell();
  console.log(cell.comboShape.ids, cell.insideCell.id);
  const foundId = cell.comboShape.ids.find((id) => id === cell.insideCell.id);

  return (
    <Stack className="combos-display" direction="vertical" style={{ gap: "2px" }}>
      {cell.comboShape.shape.map((row, rowIndex) => {
        return (
          <Stack key={rowIndex} className="m-0" direction="horizontal" style={{ gap: "2px" }}>
            {row.map((col, colIndex) => {
              const combinedBinary = ((rowIndex << 1) | colIndex).toString(2).padStart(2, "0");

              console.log(parseInt(combinedBinary, 2), foundId);
              return (
                <div
                  key={colIndex}
                  className="combos-cell p-0"
                  style={{
                    backgroundColor: col ? styles[cell.insideCell.rule] : "",
                    opacity: parseInt(combinedBinary, 2) === foundId ? 1 : 0.5,
                  }}
                />
              );
            })}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CombosDisplay;
