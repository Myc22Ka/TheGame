import options from "../config.json";
import { ScoreType } from "../contexts/ScoreContext";

const getTime = (score: ScoreType) => {
  const { speed, time } = score.gameStats;
  const { time: defaultTime } = options.score.gameStats;
  const { defaultTimeTick } = options.time;

  return ((defaultTimeTick + (time || 0) - defaultTime) / (speed || 1)) * 1000;
};

const getPieceTransition = (score: ScoreType) => {
  const { speed, time } = score.gameStats;
  const { time: defaultTime } = options.score.gameStats;
  const { defaultPieceTransition } = options.time;

  return {
    duration:
      (defaultPieceTransition + (time || 0) - defaultTime) / (speed || 1),
    ease: "anticipate",
  };
};

export { getTime, getPieceTransition };
