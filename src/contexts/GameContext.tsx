import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { GridEntry, PieceType } from "src/modules/Piece/types";
import { GameType } from "src/modules/Game/types";
import { emptyCell } from "src/modules/Game/utils";

export const initGameState: GameType = {
  gameOver: false,
  grid: Array(Math.pow(options.grid.defaultSize, 2)).fill(emptyCell),
  size: options.grid.defaultSize,
};

const useGameContext = (defaultGame: GameType) => {
  const [game, setGame] = useState(defaultGame);

  const gameLoseEvent = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      gameOver: true,
    }));
  }, [setGame]);

  const addPieceToCell = useCallback(
    (cell: GridEntry, piece: PieceType) => {
      setGame((prev) => {
        const foundIndex = prev.grid.findIndex((entry) => entry.ref === cell.ref);
        const newGrid = [...prev.grid];
        newGrid[foundIndex] = {
          ...newGrid[foundIndex],
          insideCell: { ...piece, id: foundIndex },
          isEmpty: false,
          animate: "active",
        };

        return {
          ...prev,
          grid: newGrid,
        };
      });
    },
    [setGame]
  );

  const defineRefForCells = useCallback(
    (newRefs: HTMLCollection) => {
      setGame((prev) => {
        const newGrid = prev.grid.map((entry, index) => ({
          ...entry,
          ref: newRefs[index] as HTMLDivElement,
        }));

        return {
          ...prev,
          grid: newGrid,
        };
      });
    },
    [setGame]
  );

  const resizeGrid = useCallback(() => {
    const { defaultSize, gridUpgrades } = options.grid;

    if (game.size === defaultSize + gridUpgrades.length) return;

    setGame((prev) => {
      const newTable = new Array(Math.pow(prev.size + 1, 2)).fill(emptyCell);

      for (let i = 0; i < prev.grid.length; i++) {
        newTable[i] = prev.grid[i];
      }

      return {
        ...prev,
        grid: newTable,
        size: prev.size + 1,
      };
    });
  }, [game, setGame]);

  const levelUp = useCallback(
    (cell: GridEntry) => {
      setGame((prev) => {
        const updatedGrid = prev.grid.map((gridCell) => {
          if (gridCell.insideCell.id === cell.insideCell.id) {
            return {
              ...gridCell,
              insideCell: {
                ...gridCell.insideCell,
                level: gridCell.insideCell.level + 1,
              },
            };
          }
          return gridCell;
        });
        return { ...prev, grid: updatedGrid };
      });
    },
    [setGame]
  );

  const destroyPiece = useCallback(
    (cell: GridEntry) => {
      console.log(cell);
      setGame((prev) => {
        const updatedGrid = prev.grid.map((gridCell) => {
          if (gridCell.ref === cell.ref) {
            return {
              ...gridCell,
              isDestroyed: true,
            };
          }
          return gridCell;
        });

        return { ...prev, grid: updatedGrid };
      });
    },
    [setGame]
  );

  const repairPiece = useCallback(
    (cell: GridEntry) => {
      setGame((prev) => {
        const updatedGrid = prev.grid.map((gridCell) => {
          if (gridCell.insideCell.id === cell.insideCell.id) {
            return {
              ...gridCell,
              isDestroyed: false,
            };
          }
          return gridCell;
        });

        return { ...prev, grid: updatedGrid };
      });
    },
    [setGame]
  );

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    defineRefForCells,
    addPieceToCell,
    levelUp,
    destroyPiece,
    repairPiece,
  };
};

const initContextState: ReturnType<typeof useGameContext> = {
  game: initGameState,
  gameLoseEvent: () => {},
  resizeGrid: () => {},
  defineRefForCells: () => {},
  addPieceToCell: () => {},
  levelUp: () => {},
  destroyPiece: () => {},
  repairPiece: () => {},
};

export const GameContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const GameProvider = ({ children, ...initState }: ChildrenType & GameType) => {
  return <GameContext.Provider value={useGameContext(initState)}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const { game, gameLoseEvent, resizeGrid, defineRefForCells, addPieceToCell, levelUp, destroyPiece, repairPiece } =
    useContext(GameContext);

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    defineRefForCells,
    addPieceToCell,
    levelUp,
    destroyPiece,
    repairPiece,
  };
};
