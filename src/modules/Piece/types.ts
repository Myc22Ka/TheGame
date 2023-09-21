import { GridEntry } from "../../contexts/GameContext";

type Cords = {
  x: number;
  y: number;
};

type TileType = {
  animationTrigger: boolean;
  isDragged: boolean;
  show: boolean;
  nearestCell: GridEntry;
  dragEnd: boolean;
  startingPosition: Cords;
  vector: Cords;
};

type NearestCellType = {
  cell: GridEntry;
  distance: number;
  vector: Cords;
};

export type { Cords, TileType, NearestCellType };
