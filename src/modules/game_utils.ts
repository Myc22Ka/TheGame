import options from "src/config.json";
import { ScoreType } from "./Score/types";

const getTime = (
  score: ScoreType,
  defaultTime: number = options.time.defaultTimeTick
) => {
  const { speed } = score.gameStats;

  return (defaultTime / (speed || 1)) * 1000;
};

const getPieceTransition = (score: ScoreType) => {
  const { speed } = score.gameStats;
  const { defaultPieceTransition } = options.time;

  return {
    duration: defaultPieceTransition / (speed || 1),
    ease: "anticipate",
  };
};

export { getTime, getPieceTransition };
