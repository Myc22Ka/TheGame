import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { GridEntry } from "src/modules/Piece/types";
import { ScoreType, Speed } from "src/modules/Score/types";
import { initGameState } from "./GameContext";
import { calculateActivators } from "src/modules/Score/calculateActivators";

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

  const currentGameSpeed = useCallback(() => {
    setScore((prev) => {
      const newSpeed: Speed = prev.speed;
      Object.entries(prev.speed).forEach(([key, value]) => {
        const k = key as Exclude<keyof Speed, "cycle">;
        if (typeof value === "number") newSpeed[k] = value / prev.gameStats.speed;
      });
      newSpeed["cycle"] = { ...prev.speed.cycle, time: prev.speed.cycle.time / prev.gameStats.speed };

      console.log(newSpeed, prev.gameStats.speed);

      return {
        ...prev,
        speed: newSpeed,
      };
    });
  }, [setScore]);

  const updateActivators = useCallback(
    (grid: GridEntry[] = initGameState.grid) => {
      const updatedGrid = [...grid];
      setScore((prev) => {
        setPrevScore(prev);

        const sumsOfActivators = calculateActivators(updatedGrid);

        return { ...prev, gameStats: sumsOfActivators };
      });
      return updatedGrid;
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
    currentGameSpeed,
  };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  prevScore: initState,
  addGold: () => {},
  updateActivators: () => initGameState.grid,
  removeSomeGold: () => {},
  addSomeGold: () => {},
  currentGameSpeed: () => {},
};

export const ScoreContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const ScoreProvider = ({ children, ...initState }: ChildrenType & ScoreType) => {
  return <ScoreContext.Provider value={useScoreContext(initState)}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
  const { score, prevScore, updateActivators, addGold, removeSomeGold, addSomeGold, currentGameSpeed } =
    useContext(ScoreContext);

  return {
    score,
    prevScore,
    updateActivators,
    addGold,
    removeSomeGold,
    addSomeGold,
    currentGameSpeed,
  };
};
