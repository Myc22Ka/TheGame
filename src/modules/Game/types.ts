import { GridEntry } from "../Grid/types";

type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  currentGridSize: number;
};

export type { GameType };
