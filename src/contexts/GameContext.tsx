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
  score: number;
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

export const initState: StateType = {
  gameOver: false,
  grid: DEFAULT_GRID,
  score: 1000,
};

const useGameContext = (defaultGame: StateType) => {
  const [game, setGame] = useState(defaultGame);

  const gameLoseEvent = useCallback(
    () => setGame((prev) => ({ ...prev, gameOver: true })),
    []
  );

  const addGold = useCallback(
    () => setGame((prev) => ({ ...prev, score: prev.score + 1 })),
    []
  );

  const resizeGrid = useCallback(
    (newTable: Array<GridEntry>) =>
      setGame((prev) => ({ ...prev, grid: newTable })),
    []
  );

  return { game, gameLoseEvent, resizeGrid, addGold };
};

type UseGameContextType = ReturnType<typeof useGameContext>;

const initContextState: UseGameContextType = {
  game: initState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  addGold: () => {},
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
  resizeGrid: (newTable: Array<GridEntry>) => void;
  addGold: () => void;
};

export const useGame = (): UseGameHookType => {
  const { game, gameLoseEvent, resizeGrid, addGold } = useContext(GameContext);

  return { game, gameLoseEvent, resizeGrid, addGold };
};
