import { GridEntry } from "../Grid/types";
import { MatchingShape, findBiggestShapesInGrid } from "src/utils/findShapeIn2DArray";
import { GameStats } from "./types";
import options from "src/config.json";
import { GameStatsType } from "../Score/types";

export type ShapeType = {
  shape: number[][];
  activators: GameStatsType;
};

export const checkCombos = (grid: GridEntry[], rule: GameStats) => {
  const foundPiece = options.pieces.types.find((piece) => piece.rule === rule);
  if (!foundPiece) return { grid: grid, activators: {} as GameStatsType };
  const filteredGrid = grid.filter((entry) => entry.insideCell.rule === rule);

  const shapes = foundPiece.shapes
    .map((element) => {
      const shapeLength = element.shape.flat(1).reduce((acc, curr) => acc + curr, 0);
      if (shapeLength > filteredGrid.length) return { shape: [] as number[][], activators: {} as GameStatsType };
      return { shape: element.shape, activators: element.activators } as ShapeType;
    })
    .filter((e) => e.shape.flat(1).length !== 0 && e.shape[0].length <= Math.sqrt(grid.length));

  shapes.sort((a, b) => {
    const lengthA = a.shape.flat(1).reduce((acc, curr) => acc + curr, 0);
    const lengthB = b.shape.flat(1).reduce((acc, curr) => acc + curr, 0);
    return lengthB - lengthA;
  });

  if (!shapes.length) return { grid: grid, activators: {} as GameStatsType };

  const gridCells = grid.map((entry) => entry.insideCell);

  const foundShapes = findBiggestShapesInGrid(gridCells, shapes, rule);

  const results: MatchingShape[][] = [];
  foundShapes.forEach((shape) => {
    const result = [shape];
    foundShapes.forEach((element) => {
      if (new Set([...shape.ids, ...element.ids]).size === shape.ids.length + element.ids.length) result.push(element);
    });
    const isNewResult = results.every(
      (existingResult) => !existingResult.some((existingShape) => result.includes(existingShape))
    );
    if (isNewResult) results.push(result);
  });

  results.sort((a, b) => b.reduce((acc, curr) => acc + curr.exact, 0) - a.reduce((acc, curr) => acc + curr.exact, 0));
  if (!results.length) return { grid: grid, activators: {} as GameStatsType };

  const updatedGrid = [...grid];

  updatedGrid.map((entry) => {
    entry.comboShape = [];
  });

  const activators = {} as GameStatsType;
  results[0].forEach((foundShape) => {
    let counter = 0;
    const shape = foundShape.shape.map((row) => {
      return row.map((col) => {
        return { value: col, id: col === 1 ? foundShape.ids[counter++] : -1 };
      });
    });
    const entries = Object.entries(foundShape.activators) as [Exclude<GameStats, "" | "default">, number][];

    entries.forEach(([key, value]) => {
      if (!activators[key]) activators[key] = 0;
      activators[key] += value;
    });

    foundShape.ids.forEach((id) => {
      updatedGrid[id] = {
        ...updatedGrid[id],
        comboShape: shape,
      };
    });
  });

  return { grid: grid, activators: activators };
};
