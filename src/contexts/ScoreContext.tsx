import React, { useState, useContext, createContext, ReactElement, useCallback, useEffect } from "react";
import options from "src/config.json";
import { checkCombos } from "src/modules/Game/checkCombos";
import { emptyCell } from "src/modules/Game/utils";
import { GameStats, GridEntry, PieceType } from "src/modules/Piece/types";
import { GameStatsType, ScoreType } from "src/modules/Score/types";
import { initGameState } from "./GameContext";

export const initState: ScoreType = options.score;

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

  const currentGameSpeed = useCallback(
    ({ defaultTimeTick = options.time.defaultTimeTick, devider = 1 } = {}) => {
      return ((defaultTimeTick / (score.gameStats.speed || 1)) * 1000) / devider;
    },
    [score]
  );

  const updateActivators = useCallback(
    (
      piece: PieceType,
      game: GridEntry[] = initGameState.grid,
      nearestCell: GridEntry = emptyCell,
      operator: "+" | "-" = "+"
    ) => {
      setScore((prev) => {
        setPrevScore(prev);

        const grid: GridEntry[] = [];
        game.forEach((entry) => {
          if (entry.insideCell.id === nearestCell.insideCell.id)
            grid.push({ ...entry, insideCell: { ...piece, id: nearestCell.insideCell.id } });
          else grid.push(entry);
        });

        const result = {} as GameStatsType;
        const gameStats = Object.keys(piece.activators) as Exclude<GameStats, "" | "default">[];
        const currLevel = piece.level - 1;

        gameStats.forEach((key) => {
          const stat = piece.activators[key];

          if (operator === "-") result[key] = prev.gameStats[key] - (stat || [])[currLevel];

          if (operator === "+") result[key] = prev.gameStats[key] + (stat || [])[currLevel];
        });

        const updatedGrid = checkCombos(grid, piece.rule);

        if (!Object.keys(updatedGrid.activators).length)
          return { ...prev, gameStats: { ...prev.gameStats, ...result } };

        const combosStats = {} as GameStatsType;

        Object.entries(updatedGrid.activators).forEach(([key, value]) => {
          const activator = key as Exclude<GameStats, "" | "default">;
          combosStats[activator] = 0;
          combosStats[activator] += value;
        });

        const final = {} as GameStatsType;
        Object.entries(result).forEach(([key, value]) => {
          const activator = key as Exclude<GameStats, "" | "default">;
          final[activator] = (combosStats[activator] || 0) + result[activator];
        }); // fix do it once

        return { ...prev, gameStats: { ...prev.gameStats, ...final } };
      });
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
  updateActivators: () => {},
  removeSomeGold: () => {},
  addSomeGold: () => {},
  currentGameSpeed: () => 0,
};

export const ScoreContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const ScoreProvider = ({ children, ...initState }: ChildrenType & ScoreType) => {
  const { score, currentGameSpeed, ...contextValue } = useScoreContext(initState);

  useEffect(() => {
    currentGameSpeed();
  }, [score.gameStats.speed]);

  return <ScoreContext.Provider value={{ score, currentGameSpeed, ...contextValue }}>{children}</ScoreContext.Provider>;
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
