import { GridEntry } from "../Grid/types";
import options from "src/config.json";

type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  size: number;
};

type GameStats = keyof typeof options.score.gameStats;

export type { GameType, GameStats };
