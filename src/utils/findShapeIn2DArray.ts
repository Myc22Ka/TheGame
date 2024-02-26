export const findShapeIn2DArray = <T>(array: T[][], shape: T[][]) => {
  const numRows = array.length;
  const numCols = array[0].length;
  const shapeRows = shape.length;
  const shapeCols = shape[0].length;

  for (let i = 0; i <= numRows - shapeRows; i++) {
    for (let j = 0; j <= numCols - shapeCols; j++) {
      let found = true;
      for (let si = 0; si < shapeRows; si++) {
        for (let sj = 0; sj < shapeCols; sj++) {
          if (array[i + si][j + sj] !== shape[si][sj]) {
            found = false;
            break;
          }
        }
        if (!found) break;
      }
      if (found) return true;
    }
  }
  return false;
};
