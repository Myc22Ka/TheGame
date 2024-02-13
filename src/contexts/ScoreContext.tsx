import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
import options from "src/config.json";
import { PieceType } from "src/modules/Piece/types";
import {
  ActivatorsType,
  GameStatsType,
  ScoreType,
} from "src/modules/Score/types";

export const initState: ScoreType = options.score;

const useScoreContext = (defaultScore: ScoreType) => {
  const [score, setScore] = useState(defaultScore);
  const [prevScore, setPrevScore] = useState(defaultScore);

  const addGold = useCallback(() => {
    setScore((prev) => {
      setPrevScore(prev);
      return {
        ...prev,
        gold:
          prev.gold +
          (prev.gameStats?.flatIncome || 1) * (prev.gameStats?.multiplier || 1),
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
      return (
        ((defaultTimeTick / (score.gameStats.speed || 1)) * 1000) / devider
      );
    },
    [score]
  );

  const updateActivators = useCallback(
    (piece: PieceType) => {
      setScore((prev) => {
        setPrevScore(prev);
        const result = {} as GameStatsType;

        Object.entries(piece.activators).forEach(([key, value]) => {
          result[key as keyof GameStatsType] =
            value[piece.level - 1] + prev.gameStats[key as keyof GameStatsType];
        });

        return { ...prev, gameStats: { ...prev.gameStats, ...result } };
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
  currentGameSpeed: () => {
    return 0;
  },
};

export const ScoreContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const ScoreProvider = ({
  children,
  ...initState
}: ChildrenType & ScoreType) => {
  const { score, currentGameSpeed, ...contextValue } =
    useScoreContext(initState);

  useEffect(() => {
    currentGameSpeed();
  }, [score.gameStats.speed]);

  return (
    <ScoreContext.Provider value={{ score, currentGameSpeed, ...contextValue }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const {
    score,
    prevScore,
    updateActivators,
    addGold,
    removeSomeGold,
    addSomeGold,
    currentGameSpeed,
  } = useContext(ScoreContext);

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
