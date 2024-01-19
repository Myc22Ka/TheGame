import { MarketContentType } from "./types";
import options from "src/config.json";
import { PieceType } from "../Piece/types";
import { ScoreType } from "../Score/types";

const setDefaultMarketState = (score: ScoreType): MarketContentType => {
  const { discount } = score.gameStats;
  return {
    pieces: options.pieces.types.map((e) => ({
      ...e,
      buy: Math.round(e.buy * (1 - (discount || 0))),
    })) as PieceType[],
    activeState: "Market",
  };
};

export { setDefaultMarketState };
