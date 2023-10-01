import { GridEntry } from "../Grid/types";

type Cords = {
  x: number;
  y: number;
};

type PieceType = {
  name: string;
  sell: number;
  buy: number;
  rule: string;
  level: number;
};

type TileType = {
  nearestCell: GridEntry;
  startingPosition: Cords;
  vector: Cords;
  animate: "active" | "drag" | "return" | "sell" | "exit";
};

type NearestCellType = {
  cell: GridEntry;
  distance: number;
  vector: Cords;
};

type DefaultCycleType = {
  piece: PieceType;
  time: number;
  show: boolean;
  animate: "" | "exit";
};

export type {
  Cords,
  TileType,
  NearestCellType,
  DefaultCycleType,
  PieceType,
  GridEntry,
};
