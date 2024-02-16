import React, { useState, useContext, createContext, ReactElement } from "react";
import { GridEntry } from "src/modules/Piece/types";
import { emptyCell } from "src/modules/Game/utils";

export const CellContext = createContext<GridEntry>(emptyCell);

type ChildrenType = {
  children?: ReactElement | null;
};

export const CellProvider = ({ children, ...cell }: ChildrenType & GridEntry) => {
  return <CellContext.Provider value={cell}>{children}</CellContext.Provider>;
};

export const useCell = () => {
  const cell = useContext(CellContext);
  return { cell };
};
