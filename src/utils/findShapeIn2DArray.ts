type grid2DType = {
  value: number;
  id: number;
};

type MatchingShape = {
  ids: number[];
  matching: boolean;
  exact: number;
  shape: number[][];
};

export const findShapeIn2DArray = (array: grid2DType[][], shapes: number[][][]) => {
  const numRows = array.length;
  const numCols = array[0].length;
  let result: MatchingShape[] = [];
  let maxShapeLength = 0;

  for (const shape of shapes) {
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;
    const currShapeLength = shape.flat(1).reduce((acc, curr) => acc + curr, 0);
    // if (maxShapeLength > currShapeLength) break;

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
              matchingShape.ids.push(array[i + si][j + sj].id);
              matchingShape.exact++;
            } else if (array[i + si][j + sj].value > shape[si][sj]) {
              matchingShape.ids.push(array[i + si][j + sj].id);
            } else {
              matchingShape.matching = false;
              break;
            }
          }
        }
        if (matchingShape.matching) {
          result.push(matchingShape);
          maxShapeLength = matchingShape.shape.flat(1).reduce((acc, curr) => acc + curr, 0);
        }
      }
    }
    result.sort((a, b) => b.exact - a.exact);
  }
  console.log(result);

  return { ids: result[0]?.ids || [], shape: result[0]?.shape || [] };
};
