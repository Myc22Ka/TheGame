import { PieceType } from "../Piece/types";

type ActiveStateType = "Market" | "Upgrades";

type MarketContentType = {
  pieces: PieceType[];
  activeState: ActiveStateType;
};

export type { ActiveStateType, MarketContentType };
