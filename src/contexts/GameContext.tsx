import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";
import options from "src/config.json";
import { GridEntry, PieceType } from "src/modules/Piece/types";
import { GameStats, GameType } from "src/modules/Game/types";
import { emptyCell } from "src/modules/Game/utils";
import { transformArrayInto2DArray } from "src/utils/transformInto2DArray";
import { findShapeIn2DArray } from "src/utils/findShapeIn2DArray";

const checkCombos = (grid: GridEntry[], rule: GameStats) => {
  const foundPiece = options.pieces.types.find((piece) => piece.rule === rule);
  if (!foundPiece) return;
  const filteredGrid = grid.filter((entry) => entry.insideCell.rule === rule);

  const shapes = foundPiece.shapes
    .map((element) => {
      const shapeLength = element.shape.flat(1).reduce((acc, curr) => acc + curr, 0);
      if (shapeLength > filteredGrid.length) return [];
      return element.shape;
    })
    .filter((element) => element.flat(1).length !== 0 && element[0].length <= Math.sqrt(grid.length));

  shapes.sort((a, b) => {
    const lengthA = a.flat(1).reduce((acc, curr) => acc + curr, 0);
    const lengthB = b.flat(1).reduce((acc, curr) => acc + curr, 0);
    return lengthB - lengthA;
  });

  if (!shapes.length) return;

  const grid2D = transformArrayInto2DArray(grid, Math.sqrt(grid.length), Math.sqrt(grid.length)).map((row) =>
    row.map((col) =>
      col.insideCell.id !== -1
        ? { value: Number(col.insideCell.rule === rule), id: col.insideCell.id }
        : { value: 0, id: col.insideCell.id }
    )
  );

  const matchingShapes = findShapeIn2DArray(grid2D, shapes);
  // matchingShapes.sort((a, b) => b[0].exact - a[0].exact);

  console.log(matchingShapes);
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
      setGame((prev) => {
        const foundIndex = prev.grid.findIndex((entry) => entry.ref === cell.ref);
        const newGrid = [...prev.grid];
        newGrid[foundIndex] = {
          ...newGrid[foundIndex],
          insideCell: { ...piece, id: foundIndex },
          isEmpty: false,
          animate: "active",
        };

        checkCombos(newGrid, piece.rule);

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
      const newTable = new Array(Math.pow(prev.size + 1, 2))
        .fill(emptyCell)
        .map((emptyCell, id) => ({ ...emptyCell, insideCell: { ...emptyCell.insideCell, id: id } }));

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
