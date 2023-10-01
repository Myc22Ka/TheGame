import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import options from "../config.json";
import { GridEntry, PieceType } from "../modules/Piece/types";
import { emptyCell, initGameState } from "../modules/Piece/utils";
import { GameType } from "../modules/Game/types";

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
      setGame((prev) => ({
        ...prev,
        trashCan: { ...prev.trashCan, ref: trashCanRef },
      }));
    },
    []
  );

  const setActiveTrashCan = useCallback(
    (newActiveState: "fade" | "bounce" | "none") => {
      let newAmount: number;
      if (newActiveState === "bounce") newAmount = game.trashCan.amount + 1;

      setGame((prev) => ({
        ...prev,
        trashCan: {
          ...prev.trashCan,
          animate: newActiveState,
          amount: newAmount,
        },
      }));
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
    setActiveTrashCan,
  };
};

const initContextState: ReturnType<typeof useGameContext> = {
  game: initGameState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  addRefToCell: () => {},
  addPieceToCell: () => {},
  setTrashCan: () => {},
  setActiveTrashCan: () => {},
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
    setActiveTrashCan,
  } = useContext(GameContext);

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    addRefToCell,
    addPieceToCell,
    setTrashCan,
    setActiveTrashCan,
  };
};
