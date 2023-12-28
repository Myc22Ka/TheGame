import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import options from "../config.json";

export type ActivatorsType = {
  multiplier?: number;
  flatIncome?: number;
  power?: number;
  luck?: number;
  speed?: number;
  time?: number;
  discount?: number;
  resistance?: number;
};

export type ScoreType = {
  gold: number;
  gameStats: ActivatorsType;
};

export const initState: ScoreType = options.score;

const useScoreContext = (defaultScore: ScoreType) => {
  const [score, setScore] = useState(defaultScore);

  const addGold = useCallback(
    () =>
      setScore((prev) => ({
        ...prev,
        gold:
          prev.gold +
          (prev.gameStats?.flatIncome || 1) * (prev.gameStats?.multiplier || 1),
      })),
    [setScore, score.gameStats]
  );

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
    (activators: ActivatorsType) => {
      setScore((prev) => {
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

  return { score, addGold, updateActivators, removeSomeGold, addSomeGold };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  addGold: () => {},
  updateActivators: () => {},
  removeSomeGold: () => {},
  addSomeGold: () => {},
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
  const { score, updateActivators, addGold, removeSomeGold, addSomeGold } =
    useContext(ScoreContext);

  return { score, updateActivators, addGold, removeSomeGold, addSomeGold };
};
