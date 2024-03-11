import { PieceType } from "../Piece/types";

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

export { emptyPiece };
