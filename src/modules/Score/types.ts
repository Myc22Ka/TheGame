type ActivatorsType = {
  multiplier?: number;
  flatIncome?: number;
  power?: number;
  luck?: number;
  speed?: number;
  time?: number;
  discount?: number;
  resistance?: number;
};

type ScoreType = {
  gold: number;
  gameStats: ActivatorsType;
};

export type { ActivatorsType, ScoreType };
