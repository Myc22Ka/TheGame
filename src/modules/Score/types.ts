import { GameStats } from "../Game/types";

type ActivatorsType = {
  [K in GameStats]?: number;
};

type ScoreType = {
  gold: number;
  gameStats: ActivatorsType;
};

export type { ActivatorsType, ScoreType };
