import React, { useContext, createContext, ReactElement, useCallback, useRef } from "react";
import { GridEntry } from "src/modules/Piece/types";
import { emptyCell } from "src/modules/Game/utils";
import { useGame } from "./GameContext";

export const initCellState = emptyCell;

const useCellContext = (defaultCell: GridEntry) => {
  const cell = useRef(defaultCell);
  const { addPieceToCell } = useGame();

  const updateCell = useCallback(
    (newCell: GridEntry) => {
      console.log(newCell);
      //   setCell(newCell);
    },
    [cell, addPieceToCell]
  );

  return { cell, updateCell };
};

const initContextState: ReturnType<typeof useCellContext> = {
  cell: { current: initCellState },
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
