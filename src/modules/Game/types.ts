import { GridEntry } from "../Grid/types";
import { TrashCanType } from "../Trashcan/types";

type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  currentGridSize: number;
  trashCan: TrashCanType;
};

export type { GameType };
