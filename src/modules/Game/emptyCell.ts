import { PieceType } from "../Piece/types";
import { emptyPiece } from "./emptyPiece";

export type GridEntry = {
  insideCell: PieceType;
  ref: HTMLDivElement | null;
  isEmpty: boolean;
  animate: "inactive" | "active";
  isDestroyed: boolean;
  booster: number;
};

const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  isDestroyed: false,
  ref: null,
  isEmpty: true,
  animate: "inactive",
  booster: 1,
};

export { emptyCell };
