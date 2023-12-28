import { GridEntry, PieceType } from "../Piece/types";

const emptyPiece: PieceType = {
  description: "",
  buy: 0,
  rule: "",
  level: 0,
  uses: 0,
  id: 0,
  activators: {
    multiplier: 0,
    flatIncome: 0,
  },
};

const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  ref: null,
  isEmpty: true,
  animate: "inactive",
};
export { emptyCell, emptyPiece };
