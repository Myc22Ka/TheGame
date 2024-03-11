import { GridEntry } from "../Grid/types";
import { emptyPiece } from "./emptyPiece";

const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  isDestroyed: false,
  ref: null,
  isEmpty: true,
  animate: "inactive",
};

export { emptyCell };
