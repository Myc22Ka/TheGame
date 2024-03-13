import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { GridEntry } from "src/modules/Piece/types";
import { ScoreType } from "src/modules/Score/types";
import { initGameState } from "./GameContext";
import { calculateActivators } from "src/modules/Score/calculateActivators";
import calculateSpeed from "src/utils/calculateSpeed";

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
        const newSpeed = calculateSpeed({ ...prev, gameStats: sumsOfActivators });

        return { ...prev, gameStats: sumsOfActivators, speed: newSpeed };
      });
      return updatedGrid;
    },
    [setScore]
  );

  const changeSpeed = useCallback(
    ({
      timerMult = 1,
      tickMult = 1,
      pieceTransitionMult = 1,
      maxTimeMult = 1,
      statusChangeTimeMult = 1,
      destroyTimeMult = 1,
      rejectTimeMult = 1,
      cycleAddSteps = 0,
    } = {}) => {
      setScore((prev) => ({
        ...prev,
        speed: {
          timer: prev.speed.timer * timerMult,
          tick: prev.speed.tick * tickMult,
          pieceTransition: prev.speed.pieceTransition * pieceTransitionMult,
          maxTime: prev.speed.maxTime * maxTimeMult,
          statusChangeTime: prev.speed.statusChangeTime * statusChangeTimeMult,
          destroyTime: prev.speed.destroyTime * destroyTimeMult,
          rejectTime: prev.speed.rejectTime * rejectTimeMult,
          cycle: { ...prev.speed.cycle, steps: prev.speed.cycle.steps + cycleAddSteps },
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
    changeSpeed,
  };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  prevScore: initState,
  addGold: () => {},
  updateActivators: () => initGameState.grid,
  removeSomeGold: () => {},
  addSomeGold: () => {},
  changeSpeed: () => {},
};

export const ScoreContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const ScoreProvider = ({ children, ...initState }: ChildrenType & ScoreType) => {
  return <ScoreContext.Provider value={useScoreContext(initState)}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
  const { score, prevScore, updateActivators, addGold, removeSomeGold, addSomeGold, changeSpeed } =
    useContext(ScoreContext);

  return {
    score,
    prevScore,
    updateActivators,
    addGold,
    removeSomeGold,
    addSomeGold,
    changeSpeed,
  };
};
