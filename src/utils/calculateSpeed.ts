import { ScoreType, Speed } from "src/modules/Score/types";
import options from "src/config.json";

const calculateSpeed = (prev: ScoreType) => {
  const newSpeed: Speed = {} as Speed;
  Object.entries(options.score.speed).forEach(([key, value]) => {
    const k = key as Exclude<keyof Speed, "cycle">;
    if (k === "maxTime") return;
    if (typeof value === "number") newSpeed[k] = Math.ceil(value / prev.gameStats.speed);
  });
  newSpeed["cycle"] = {
    ...prev.speed.cycle,
    time: Math.ceil(options.score.speed.cycle.time / prev.gameStats.speed),
  };

  return newSpeed;
};

export default calculateSpeed;
