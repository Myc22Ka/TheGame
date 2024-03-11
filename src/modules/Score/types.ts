import { GameStats } from "../Game/rules";

type ActivatorsType = {
  [K in Exclude<GameStats, "">]?: number[];
};

type GameStatsType = {
  [K in Exclude<GameStats, "" | "default">]: number;
};

type ScoreType = {
  gold: number;
  gameStats: GameStatsType;
};

export type { ActivatorsType, ScoreType, GameStatsType };
