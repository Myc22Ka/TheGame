import { GameType } from "src/contexts/GameContext";
import { PieceType } from "src/modules/Piece/types";
import { transformArrayInto2DArray } from "./transformInto2DArray";

export const getIdsAroundPiece = (piece: PieceType, game: GameType) => {
  if (game.size < 3) return game.grid.filter((e) => e.insideCell.id !== piece.id).map((e) => e.insideCell.id);
  const grid2D = transformArrayInto2DArray(game.grid, game.size, game.size);

  let row = -1;
  let col = -1;
  for (let i = 0; i < game.size; i++) {
    for (let j = 0; j < game.size; j++) {
      if (grid2D[i][j].insideCell.id === piece.id) {
        row = i;
        col = j;
        break;
      }
    }
  }

  if (row + col < 0) return [];
  const around = [];
  for (let i = Math.max(0, row - 1); i <= Math.min(game.size - 1, row + 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(game.size - 1, col + 1); j++) {
      if (i !== row || j !== col) {
        around.push(grid2D[i][j].insideCell.id);
      }
    }
  }

  return around;
};
