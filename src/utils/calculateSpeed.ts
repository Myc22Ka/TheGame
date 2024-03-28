import { ScoreType, Speed } from "src/modules/Score/types";
import options from "src/config.json";

const calculateSpeed = (prev: ScoreType) => {
  const newSpeed: Speed = {} as Speed;
  Object.entries(options.score.speed).forEach(([key, value]) => {
    console.log(key);
    const k = key as Exclude<keyof Speed, "cycle">;
    if (k === "maxTime") {
      newSpeed[k] = prev.speed.maxTime;
      return;
    }
    if (typeof value === "number") newSpeed[k] = +(value / prev.gameStats.speed).toFixed(2);
  });
  newSpeed["cycle"] = {
    ...prev.speed.cycle,
    time: +(options.score.speed.cycle.time / prev.gameStats.speed).toFixed(2),
  };

  return newSpeed;
};

export default calculateSpeed;
