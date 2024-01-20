import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import options from "src/config.json";
import { ActivatorsType, ScoreType } from "src/modules/Score/types";

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

  const speedUp = useCallback(() => {
    return (options.time.defaultTimeTick / (score.gameStats.speed || 1)) * 1000;
  }, [score]);

  const updateActivators = useCallback(
    (activators: ActivatorsType) => {
      setScore((prev) => {
        setPrevScore(prev);
        const result: ActivatorsType = {};

        Object.entries(activators).map(([key, value]) => {
          result[key as keyof ActivatorsType] =
            (value || 0) + (prev.gameStats[key as keyof ActivatorsType] || 0);
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
    speedUp,
  };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  prevScore: initState,
  addGold: () => {},
  updateActivators: () => {},
  removeSomeGold: () => {},
  addSomeGold: () => {},
  speedUp: () => {
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
  return (
    <ScoreContext.Provider value={useScoreContext(initState)}>
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
    speedUp,
  } = useContext(ScoreContext);

  return {
    score,
    prevScore,
    updateActivators,
    addGold,
    removeSomeGold,
    addSomeGold,
    speedUp,
  };
};
