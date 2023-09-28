import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import options from "../config.json";

export type PieceType = {
  name: string;
  sell: number;
  buy: number;
  rule: string;
  level: number;
};

export const emptyPiece: PieceType = {
  name: "",
  sell: 0,
  buy: 0,
  rule: "",
  level: 0,
};

export type GridEntry = {
  insideCell: PieceType;
  ref: React.RefObject<HTMLDivElement> | null;
  isEmpty: boolean;
  animate: "inactive" | "active";
};

export const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  ref: null,
  isEmpty: true,
  animate: "inactive",
};

export type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  currentGridSize: number;
  trashCan: React.RefObject<HTMLDivElement> | null;
};

export const initState: GameType = {
  gameOver: false,
  grid: Array(Math.pow(options.grid.size, 2)).fill(emptyCell),
  currentGridSize: options.grid.size,
  trashCan: null,
};

const useGameContext = (defaultGame: GameType) => {
  const [game, setGame] = useState(defaultGame);

  const gameLoseEvent = useCallback(
    () => setGame((prev) => ({ ...prev, gameOver: true })),
    []
  );

  const addPieceToCell = useCallback(
    (cell: GridEntry, piece: PieceType) => {
      const foundIndex = game.grid.findIndex((entry) => entry.ref === cell.ref);

      const newGrid = [...game.grid];
      newGrid[foundIndex] = {
        ...newGrid[foundIndex],
        insideCell: piece,
        isEmpty: false,
        animate: "active",
      };

      setGame((prev) => ({ ...prev, grid: newGrid }));
    },
    [game]
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

  const setTrashCan = useCallback(
    (trashCanRef: React.RefObject<HTMLDivElement>) => {
      setGame((prev) => ({ ...prev, trashCan: trashCanRef }));
    },
    []
  );

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    addRefToCell,
    addPieceToCell,
    setTrashCan,
  };
};

const initContextState: ReturnType<typeof useGameContext> = {
  game: initState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  addRefToCell: () => {},
  addPieceToCell: () => {},
  setTrashCan: () => {},
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
  const {
    game,
    gameLoseEvent,
    resizeGrid,
    addRefToCell,
    addPieceToCell,
    setTrashCan,
  } = useContext(GameContext);

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    addRefToCell,
    addPieceToCell,
    setTrashCan,
  };
};
