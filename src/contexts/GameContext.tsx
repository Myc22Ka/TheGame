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

export type GameType = {
  gameOver: boolean;
  grid: Array<GridEntry>;
  currentGridSize: number;
};

export const initState: GameType = {
  gameOver: false,
  grid: Array(Math.pow(options.grid.size, 2)).fill(emptyCell),
  currentGridSize: options.grid.size,
};

const useGameContext = (defaultGame: GameType) => {
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

  const resizeGrid = useCallback(() => {
    if (game.currentGridSize === options.grid.maxSize) return;

    const updatedCurrentGridSize = game.currentGridSize + 1;
    const newTable = new Array(Math.pow(updatedCurrentGridSize, 2));
    newTable.fill(emptyCell);

    for (let i = 0; i < game.grid.length; i++) newTable[i] = game.grid[i];

    setGame((prev) => ({
      ...prev,
      grid: newTable,
      currentGridSize: updatedCurrentGridSize,
    }));
  }, [game]);

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
}: ChildrenType & GameType) => {
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
