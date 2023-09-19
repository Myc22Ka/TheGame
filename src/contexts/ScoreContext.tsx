import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import config from "../config.json";

type ScoreType = {
  gold: number;
  multiplier: number;
  baseIncome: number;
};

export const initState: ScoreType = config.points;

const useScoreContext = (defaultScore: ScoreType) => {
  const [score, setScore] = useState(defaultScore);

  const addGold = useCallback(
    () =>
      setScore((prev) => ({
        ...prev,
        gold: prev.gold + score.multiplier * score.baseIncome,
      })),
    []
  );

  const addSomeGold = useCallback((amount: number) => {
    setScore((prev) => ({ ...prev, gold: prev.gold + amount }));
  }, []);

  const removeSomeGold = useCallback((amount: number) => {
    setScore((prev) => ({ ...prev, gold: prev.gold - amount }));
  }, []);

  const setMultiplier = useCallback((newMultiplier: number) => {
    setScore((prev) => ({ ...prev, multiplier: newMultiplier }));
  }, []);

  return { score, addGold, setMultiplier, removeSomeGold, addSomeGold };
};

const initContextState: ReturnType<typeof useScoreContext> = {
  score: initState,
  addGold: () => {},
  setMultiplier: () => {},
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
  const { score, setMultiplier, addGold, removeSomeGold, addSomeGold } =
    useContext(ScoreContext);

  return { score, setMultiplier, addGold, removeSomeGold, addSomeGold };
};
