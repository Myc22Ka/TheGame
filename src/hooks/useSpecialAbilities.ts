import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { PieceType } from "src/modules/Piece/types";
import { getIdsAroundPiece } from "src/utils/getIdsAroundPiece";

export const useSpecialAbilities = () => {
  const { score, changeSpeed } = useScore();
  const { game, updateGrid } = useGame();

  const giveAbility = (piece: PieceType) => {
    switch (piece.rule) {
      case "multiplier":
        return;
      case "speed":
        speedAbility(piece);
        break;
      case "booster":
        boostAbility(piece);
        return;
      default:
        break;
    }
  };

  const speedAbility = (piece: PieceType) => {
    changeSpeed({ timerMult: piece.level * (piece.abilities || [])[0].value });
  };

  const boostAbility = (piece: PieceType) => {
    if (piece.level !== piece.upgradeCost.length) return;
    const ids = getIdsAroundPiece(piece, game);
    const newGrid = game.grid.map((cell) => (ids.includes(cell.insideCell.id) ? { ...cell, booster: 2 } : cell));
    updateGrid(newGrid);
  };

  return { giveAbility };
};
