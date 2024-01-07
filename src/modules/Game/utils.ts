import { GameStats, GridEntry, PieceType } from "../Piece/types";
import options from "../../config.json";

const emptyPiece: PieceType = {
  description: "",
  name: "",
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

const rules: GameStats[] = Object.keys(options.score.gameStats) as GameStats[];

export { emptyCell, emptyPiece, rules };
