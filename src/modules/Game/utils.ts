import { GameStats, GridEntry, PieceType } from "../Piece/types";
import options from "src/config.json";

const emptyPiece: PieceType = {
  comboShape: [],
  description: "",
  name: "",
  upgradeCost: [],
  destroyChance: [],
  rule: "default",
  level: 0,
  uses: 0,
  id: -1,
  activators: {},
};

const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  isDestroyed: false,
  ref: null,
  isEmpty: true,
  animate: "inactive",
};

const rules: GameStats[] = Object.keys(options.score.gameStats) as GameStats[];

export { emptyCell, emptyPiece, rules };
