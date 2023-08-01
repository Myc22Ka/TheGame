import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";

export type GridEntry = { name: string };

type StateType = {
  gameOver: boolean;
  grid: Array<GridEntry>;
};

const DEFAULT_GRID: Array<GridEntry> = [
  { name: "Pantak" },
  { name: "Ma" },
  { name: "Małego" },
  { name: "Fiutka" },
  { name: "I" },
  { name: "Jest" },
  { name: "Turbo" },
  { name: "Gejem" },
  { name: "XD" },
];

export const initState: StateType = { gameOver: false, grid: DEFAULT_GRID };

const useGameContext = (defaultGame: StateType) => {
  const [game, setGame] = useState(defaultGame);

  const gameLoseEvent = useCallback(
    () => setGame({ ...game, gameOver: true }),
    []
  );

  return { game, gameLoseEvent };
};

type UseGameContextType = ReturnType<typeof useGameContext>;

const initContextState: UseGameContextType = {
  game: initState,
  gameLoseEvent: () => {},
};

export const GameContext = createContext<UseGameContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const GameProvider = ({
  children,
  ...initState
}: ChildrenType & StateType) => {
  return (
    <GameContext.Provider value={useGameContext(initState)}>
      {children}
    </GameContext.Provider>
  );
};

type UseGameHookType = {
  game: StateType;
  gameLoseEvent: () => void;
};

export const useGame = (): UseGameHookType => {
  const { game, gameLoseEvent } = useContext(GameContext);

  return { game, gameLoseEvent };
};
