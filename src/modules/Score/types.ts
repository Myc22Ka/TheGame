import { GameStats } from "../Game/types";

type ActivatorsType = {
  [K in Exclude<GameStats, "">]?: number;
};

type ScoreType = {
  gold: number;
  gameStats: ActivatorsType;
};

export type { ActivatorsType, ScoreType };
