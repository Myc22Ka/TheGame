import { PieceType } from "../Piece/types";

type GridEntry = {
  insideCell: PieceType;
  ref: HTMLDivElement | null;
  isEmpty: boolean;
  animate: "inactive" | "active";
  isDestroyed: boolean;
  comboShape: number[][];
};

export type { GridEntry };
