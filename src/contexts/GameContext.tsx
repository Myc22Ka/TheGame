import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import options from "../config.json";

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
};

export const initState: StateType = {
  gameOver: false,
  grid: Array(Math.pow(options.defaultGridSize, 2)).fill(emptyCell),
};

const useGameContext = (defaultGame: StateType) => {
  const [game, setGame] = useState(defaultGame);

  const gameLoseEvent = useCallback(
    () => setGame((prev) => ({ ...prev, gameOver: true })),
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

  return { game, gameLoseEvent, resizeGrid, addRefToCell };
};

const initContextState: ReturnType<typeof useGameContext> = {
  game: initState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  addRefToCell: () => {},
};

export const GameContext = createContext(initContextState);

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

export const useGame = () => {
  const { game, gameLoseEvent, resizeGrid, addRefToCell } =
    useContext(GameContext);

  return { game, gameLoseEvent, resizeGrid, addRefToCell };
};
