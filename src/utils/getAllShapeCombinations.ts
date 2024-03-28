import { ShapeType } from "src/modules/Game/checkCombos";
import { transformArrayInto2DArray } from "./transformInto2DArray";
import { GameStats, PieceRules, PieceType } from "src/modules/Piece/types";
import { GameStatsType } from "src/modules/Score/types";

type grid2DType = {
  value: number;
  id: number;
};

export type MatchingShape = {
  ids: number[];
  matching: boolean;
  exact: number;
  shape: number[][];
  activators: GameStatsType;
};

export const getAllShapeCombinations = (tempGrid: PieceType[], shapes: ShapeType[], rule: PieceRules) => {
  const array: grid2DType[][] = transformArrayInto2DArray(
    tempGrid,
    Math.sqrt(tempGrid.length),
    Math.sqrt(tempGrid.length)
  ).map((row) => row.map((col) => ({ value: Number(col.rule === rule), id: col.id })));

  const numRows = array.length;
  const numCols = array[0].length;
  let result: MatchingShape[] = [];

  for (const element of shapes) {
    const shapeRows = element.shape.length;
    const shapeCols = element.shape[0].length;

    for (let i = 0; i <= numRows - shapeRows; i++) {
      for (let j = 0; j <= numCols - shapeCols; j++) {
        const matchingShape: MatchingShape = {
          ids: [],
          matching: true,
          exact: 0,
          shape: element.shape,
          activators: element.activators,
        };
        for (let si = 0; si < shapeRows; si++) {
          for (let sj = 0; sj < shapeCols; sj++) {
            if (!matchingShape.matching) break;

            if (array[i + si][j + sj].value === element.shape[si][sj]) {
              if (element.shape[si][sj]) matchingShape.ids.push(array[i + si][j + sj].id);
              matchingShape.exact++;
            } else if (array[i + si][j + sj].value > element.shape[si][sj]) {
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
