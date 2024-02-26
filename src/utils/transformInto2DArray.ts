export const transformArrayInto2DArray = <T>(array: T[], rows: number, cols: number) => {
  if (array.length !== rows * cols) return []; // needs to be symetrical

  const result = [];
  for (let i = 0; i < rows; i++) {
    result.push(array.slice(i * cols, (i + 1) * cols));
  }
  return result;
};
