import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";

export type GridEntry = {
  name: string;
  ref: React.RefObject<HTMLDivElement> | null;
};

export const emptyCell: GridEntry = {
  name: "",
  ref: null,
};

type StateType = {
  gameOver: boolean;
  grid: Array<GridEntry>;
  score: number;
};

const DEFAULT_GRID: Array<GridEntry> = Array(4).fill(emptyCell);

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

  const addRefToCell = useCallback(
    (newRef: React.RefObject<HTMLDivElement> | null, index: number) => {
      setGame((prev) => {
        // Create a new copy of the grid array with the updated ref at the specified index
        const newGrid = [...prev.grid];
        newGrid[index] = { ...newGrid[index], ref: newRef };

        // Return a new state with the updated grid
        return { ...prev, grid: newGrid };
      });
    },
    []
  );

  const resizeGrid = useCallback(
    (newTable: Array<GridEntry>) =>
      setGame((prev) => ({ ...prev, grid: newTable })),
    []
  );

  return { game, gameLoseEvent, resizeGrid, addGold, addRefToCell };
};

type UseGameContextType = ReturnType<typeof useGameContext>;

const initContextState: UseGameContextType = {
  game: initState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  addGold: () => {},
  addRefToCell: () => {},
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
  addRefToCell: (
    newRef: React.RefObject<HTMLDivElement> | null,
    index: number
  ) => void;
};

export const useGame = (): UseGameHookType => {
  const { game, gameLoseEvent, resizeGrid, addGold, addRefToCell } =
    useContext(GameContext);

  return { game, gameLoseEvent, resizeGrid, addGold, addRefToCell };
};
