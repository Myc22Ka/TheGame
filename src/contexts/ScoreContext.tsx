import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { GridEntry } from "src/modules/Piece/types";
import { ScoreType } from "src/modules/Score/types";
import { initGameState } from "./GameContext";
import { calculateActivators } from "src/modules/Score/calculateActivators";
// import calculateSpeed from "src/utils/calculateSpeed";

const { gold, gameStats, speed } = options.score;
export const initState: ScoreType = { gold, gameStats, speed };

const useScoreContext = (defaultScore: ScoreType) => {
  const [score, setScore] = useState(defaultScore);
  const [prevScore, setPrevScore] = useState(defaultScore);

  const addGold = useCallback(() => {
    setScore((prev) => {
      setPrevScore(prev);
      return {
        ...prev,
        gold: prev.gold + (prev.gameStats?.flatIncome || 1) * (prev.gameStats?.multiplier || 1),
      };
    });
  }, [setScore]);

  const addSomeGold = useCallback(
    (amount: number) => {
      setScore((prev) => ({ ...prev, gold: prev.gold + amount }));
    },
    [setScore]
  );

  const removeSomeGold = useCallback(
    (amount: number) => {
      setScore((prev) => ({ ...prev, gold: prev.gold - amount }));
    },
    [setScore]
  );

  const updateActivators = useCallback(
    (grid: GridEntry[] = initGameState.grid) => {
      const updatedGrid = [...grid];
      setScore((prev) => {
        setPrevScore(prev);

        const sumsOfActivators = calculateActivators(updatedGrid);

        const { tick, pieceTransition, statusChangeTime, destroyTime, rejectTime, cycle } = options.score.speed;

        const newSpeed = {
          ...prev.speed,
          tick: +(tick / sumsOfActivators.speed).toFixed(2),
          pieceTransition: +(pieceTransition / sumsOfActivators.speed).toFixed(2),
          statusChangeTime: +(statusChangeTime / sumsOfActivators.speed).toFixed(2),
          destroyTime: +(destroyTime / sumsOfActivators.speed).toFixed(2),
          rejectTime: +(rejectTime / sumsOfActivators.speed).toFixed(2),
          cycle: { ...cycle, time: +(cycle.time / sumsOfActivators.speed).toFixed(2) },
        };

        return { ...prev, gameStats: sumsOfActivators, speed: newSpeed };
      });
      return updatedGrid;
    },
    [setScore]
  );

  const changeTimeSpeed = useCallback(
    (timerMult: number) => {
      setScore((prev) => ({
        ...prev,
        speed: {
          ...prev.speed,
          timer: options.score.speed.timer * timerMult,
        },
      }));
    },
    [setScore]
  );

  return {
    score,
    prevScore,
    addGold,
    updateActivators,
    removeSomeGold,
    addSomeGold,
    changeTimeSpeed,
  };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  prevScore: initState,
  addGold: () => {},
  updateActivators: () => initGameState.grid,
  removeSomeGold: () => {},
  addSomeGold: () => {},
  changeTimeSpeed: () => {},
};

export const ScoreContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const ScoreProvider = ({ children, ...initState }: ChildrenType & ScoreType) => {
  return <ScoreContext.Provider value={useScoreContext(initState)}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
  const { score, prevScore, updateActivators, addGold, removeSomeGold, addSomeGold, changeTimeSpeed } =
    useContext(ScoreContext);

  return {
    score,
    prevScore,
    updateActivators,
    addGold,
    removeSomeGold,
    addSomeGold,
    changeTimeSpeed,
  };
};
