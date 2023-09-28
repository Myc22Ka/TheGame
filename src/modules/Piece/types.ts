import { GridEntry, PieceType } from "../../contexts/GameContext";

type Cords = {
  x: number;
  y: number;
};

type TileType = {
  nearestCell: GridEntry;
  startingPosition: Cords;
  vector: Cords;
  animate: "active" | "inactive" | "drag" | "return" | "sell" | "exit";
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

export type { Cords, TileType, NearestCellType, DefaultCycleType };
