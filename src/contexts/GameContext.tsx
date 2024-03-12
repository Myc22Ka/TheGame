import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { PieceType } from "src/modules/Piece/types";
import { emptyCell } from "src/modules/Game/emptyCell";
import { specialAbilities } from "src/utils/specialAbilities";

export type GameType = {
  gameOver: boolean;
  grid: GridEntry[];
  size: number;
};

export type GridEntry = {
  insideCell: PieceType;
  ref: HTMLDivElement | null;
  isEmpty: boolean;
  animate: "inactive" | "active";
  isDestroyed: boolean;
};

export const initGameState: GameType = {
  gameOver: false,
  grid: Array(Math.pow(options.grid.defaultSize, 2))
    .fill(emptyCell)
    .map((emptyCell, id) => ({ ...emptyCell, insideCell: { ...emptyCell.insideCell, id: id } })),
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
      let updatedGame: GridEntry[] = initGameState.grid;
      setGame((prev) => {
        const foundIndex = prev.grid.findIndex((entry) => entry.ref === cell.ref);
        const newGrid = [...prev.grid];
        newGrid[foundIndex] = {
          ...newGrid[foundIndex],
          insideCell: { ...piece, id: foundIndex },
          isEmpty: false,
          animate: "active",
        };

        updatedGame = [...newGrid];

        return {
          ...prev,
          grid: newGrid,
        };
      });
      return updatedGame;
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
    let updatedGrid = initGameState.grid;

    if (game.size === defaultSize + gridUpgrades.length) return updatedGrid;

    setGame((prev) => {
      const newTable = new Array(Math.pow(prev.size + 1, 2))
        .fill(emptyCell)
        .map((emptyCell, id) => ({ ...emptyCell, insideCell: { ...emptyCell.insideCell, id: id } }));

      for (let i = 0; i < prev.grid.length; i++) {
        newTable[i] = prev.grid[i];
      }
      updatedGrid = newTable;

      return {
        ...prev,
        grid: newTable,
        size: prev.size + 1,
      };
    });
    return updatedGrid;
  }, [game, setGame]);

  const updateGrid = useCallback(
    (updatedGame: GridEntry[]) => {
      setGame((prev) => ({ ...prev, grid: updatedGame }));
    },
    [setGame]
  );

  const levelUp = useCallback(
    (cell: GridEntry) => {
      let updatedGame: GridEntry[] = initGameState.grid;
      setGame((prev) => {
        const updatedGrid = prev.grid.map((gridCell) => {
          if (gridCell.insideCell.id === cell.insideCell.id) {
            const newLevel = gridCell.insideCell.level + 1;
            const foundPiece = options.pieces.types.find((p) => p.rule === cell.insideCell.rule);
            if (newLevel === foundPiece?.upgradeCost.length) specialAbilities(cell.insideCell.rule);
            return {
              ...gridCell,
              insideCell: {
                ...gridCell.insideCell,
                level: newLevel,
              },
            };
          }
          return gridCell;
        });

        updatedGame = [...updatedGrid];

        return { ...prev, grid: updatedGrid };
      });
      return updatedGame;
    },
    [setGame]
  );

  const destroyPiece = useCallback(
    (cell: GridEntry) => {
      let updatedGame: GridEntry[] = initGameState.grid;
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

        updatedGame = [...updatedGrid];

        return { ...prev, grid: updatedGrid };
      });
      return updatedGame;
    },
    [setGame]
  );

  const repairPiece = useCallback(
    (cell: GridEntry) => {
      let updatedGame: GridEntry[] = initGameState.grid;
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

        updatedGame = [...updatedGrid];

        return { ...prev, grid: updatedGrid };
      });
      return updatedGame;
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
    updateGrid,
  };
};

const initContextState: ReturnType<typeof useGameContext> = {
  game: initGameState,
  gameLoseEvent: () => {},
  resizeGrid: () => initGameState.grid,
  defineRefForCells: () => {},
  addPieceToCell: () => initGameState.grid,
  levelUp: () => initGameState.grid,
  destroyPiece: () => initGameState.grid,
  repairPiece: () => initGameState.grid,
  updateGrid: () => {},
};

export const GameContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const GameProvider = ({ children, ...initState }: ChildrenType & GameType) => {
  return <GameContext.Provider value={useGameContext(initState)}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const {
    game,
    gameLoseEvent,
    resizeGrid,
    defineRefForCells,
    addPieceToCell,
    levelUp,
    destroyPiece,
    repairPiece,
    updateGrid,
  } = useContext(GameContext);

  return {
    game,
    gameLoseEvent,
    resizeGrid,
    defineRefForCells,
    addPieceToCell,
    levelUp,
    destroyPiece,
    repairPiece,
    updateGrid,
  };
};
