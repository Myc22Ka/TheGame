import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";

type StateType = {
  gameOver: boolean;
};

export const initState: StateType = { gameOver: false };

const useGameOverContext = (defaultIsGameOver: StateType) => {
  const [isGameOver, setIsGameOver] = useState(defaultIsGameOver);

  const gameLoseEvent = useCallback(
    () => setIsGameOver({ gameOver: true }),
    []
  );

  return { isGameOver, gameLoseEvent };
};

type UseGameOverContextType = ReturnType<typeof useGameOverContext>;

const initContextState: UseGameOverContextType = {
  isGameOver: initState,
  gameLoseEvent: () => {},
};

export const GameOverContext =
  createContext<UseGameOverContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const GameOverProvider = ({
  children,
  ...initState
}: ChildrenType & StateType) => {
  return (
    <GameOverContext.Provider value={useGameOverContext(initState)}>
      {children}
    </GameOverContext.Provider>
  );
};

type UseGameOverHookType = {
  isGameOver: StateType;
  gameLoseEvent: () => void;
};

export const useGameOver = (): UseGameOverHookType => {
  const { isGameOver, gameLoseEvent } = useContext(GameOverContext);

  return { isGameOver, gameLoseEvent };
};
