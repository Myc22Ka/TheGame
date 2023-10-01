import { TrashcanType } from "../../contexts/TrashcanContext";
import { GridEntry } from "../Grid/types";

type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  currentGridSize: number;
  trashCan: TrashcanType;
};

export type { GameType };
