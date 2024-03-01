import { PieceType } from "../Piece/types";

type GridEntry = {
  insideCell: PieceType;
  ref: HTMLDivElement | null;
  isEmpty: boolean;
  animate: "inactive" | "active";
  isDestroyed: boolean;
  comboShape: {
    shape: { value: number; id: number }[][];
  };
};

export type { GridEntry };
