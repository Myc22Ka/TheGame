import React from "react";
import { Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import styles from "src/styles/style.module.scss";

const CombosDisplay: React.FC = () => {
  const { cell } = useCell();

  return (
    <Stack className="combos-display" direction="vertical" style={{ gap: "2px" }}>
      {cell.insideCell.comboShape.map((row, rowIndex) => {
        return (
          <Stack key={rowIndex} className="m-0" direction="horizontal" style={{ gap: "2px" }}>
            {row.map((col, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className="combos-cell p-0"
                  style={{
                    backgroundColor: col.value ? styles[cell.insideCell.rule] : "",
                    opacity: col.id === cell.insideCell.id ? 1 : 0.5,
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
