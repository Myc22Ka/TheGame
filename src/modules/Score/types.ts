import { GameStats } from "../Game/rules";

type ActivatorsType = {
  [K in Exclude<GameStats, "">]?: number[];
};

type GameStatsType = {
  [K in Exclude<GameStats, "" | "default">]: number;
};

type Speed = {
  timer: number;
  tick: number;
  pieceTransition: number;
  maxTime: number;
  statusChangeTime: number;
  destroyTime: number;
  rejectTime: number;
  cycle: {
    steps: number;
    time: number;
  };
};

type ScoreType = {
  gold: number;
  gameStats: GameStatsType;
  speed: Speed;
};

export type { ActivatorsType, ScoreType, GameStatsType, Speed };
