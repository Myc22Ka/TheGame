import { GridEntry } from "../../contexts/GameContext";

type Cords = {
  x: number;
  y: number;
};

type TileType = {
  nearestCell: GridEntry;
  startingPosition: Cords;
  vector: Cords;
  animate: "active" | string;
  isDropped: boolean;
};

type NearestCellType = {
  cell: GridEntry;
  distance: number;
  vector: Cords;
};

export type { Cords, TileType, NearestCellType };
