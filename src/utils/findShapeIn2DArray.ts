type grid2DType = {
  value?: number;
  id?: number;
};

export const findShapeIn2DArray = (array: grid2DType[][], shape: number[][]) => {
  let result: any[];

  for (let i = 0; i < array.length; i++) {
    result = [];

    for (let j = 0; j < array[i].length; j++) {
      if ((array[i][j].value || 0) - shape[i][j] < 0) {
        result = [];
        break;
      }
      // if ((array[i][j].value || 0) === shape[i][j]) result.push(array[i][j].id);
      // we got a problem here...
    }
  }
};
