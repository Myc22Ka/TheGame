function deepCopy<T>(obj: T, visited = new WeakMap()): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  if (Array.isArray(obj)) {
    const copiedArray = obj.map((item) => deepCopy(item, visited));
    visited.set(obj, copiedArray);
    return copiedArray as any;
  }

  const copiedObj: any = {};

  visited.set(obj, copiedObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copiedObj[key] = deepCopy(obj[key], visited);
    }
  }

  return copiedObj as T;
}

export { deepCopy };
