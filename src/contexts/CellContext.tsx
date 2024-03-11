import React, { useContext, createContext, ReactElement, useCallback, useRef, useState } from "react";
import { GridEntry } from "src/modules/Piece/types";
import { useGame } from "./GameContext";
import { emptyCell } from "src/modules/Game/emptyCell";

const useCellContext = (defaultCell: GridEntry) => {
  const [cell, setCell] = useState(defaultCell);
  const { addPieceToCell } = useGame();

  const updateCell = useCallback(
    (newCell: GridEntry) => {
      setCell(newCell);
    },
    [cell, addPieceToCell]
  );

  return { cell, updateCell };
};

const initContextState: ReturnType<typeof useCellContext> = {
  cell: emptyCell,
  updateCell: () => {},
};

export const CellContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const CellProvider = ({ children, ...initState }: ChildrenType & GridEntry) => {
  return <CellContext.Provider value={useCellContext(initState)}>{children}</CellContext.Provider>;
};

export const useCell = () => {
  const { cell, updateCell } = useContext(CellContext);

  return { cell, updateCell };
};
