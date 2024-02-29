import { transformArrayInto2DArray } from "./transformInto2DArray";
import { GameStats, PieceType } from "src/modules/Piece/types";

type grid2DType = {
  value: number;
  id: number;
};

export type MatchingShape = {
  ids: number[];
  matching: boolean;
  exact: number;
  shape: number[][];
};

export const findBiggestShapesInGrid = (tempGrid: PieceType[], shapes: number[][][], rule: GameStats) => {
  const array: grid2DType[][] = transformArrayInto2DArray(
    tempGrid,
    Math.sqrt(tempGrid.length),
    Math.sqrt(tempGrid.length)
  ).map((row) => row.map((col) => ({ value: Number(col.rule === rule), id: col.id })));

  const numRows = array.length;
  const numCols = array[0].length;
  let result: MatchingShape[] = [];

  for (const shape of shapes) {
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;

    for (let i = 0; i <= numRows - shapeRows; i++) {
      for (let j = 0; j <= numCols - shapeCols; j++) {
        const matchingShape: MatchingShape = {
          ids: [],
          matching: true,
          exact: 0,
          shape: shape,
        };
        for (let si = 0; si < shapeRows; si++) {
          for (let sj = 0; sj < shapeCols; sj++) {
            if (!matchingShape.matching) break;

            if (array[i + si][j + sj].value === shape[si][sj]) {
              if (shape[si][sj]) matchingShape.ids.push(array[i + si][j + sj].id);
              matchingShape.exact++;
            } else if (array[i + si][j + sj].value > shape[si][sj]) {
              continue;
            } else {
              matchingShape.matching = false;
              break;
            }
          }
        }
        if (matchingShape.matching) result.push(matchingShape);
      }
    }
    result.sort((a, b) => b.exact - a.exact);
  }
  return result;
};
