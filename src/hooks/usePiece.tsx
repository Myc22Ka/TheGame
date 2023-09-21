import { useState, useRef, useCallback } from "react";
import { PieceType, useGame } from "../contexts/GameContext";
import { useScore } from "../contexts/ScoreContext";
import {
  defaultTile,
  findNearestCell,
  calcCenterPoint,
} from "../modules/Piece/utils";

export const usePiece = (piece: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell } = useGame();
  const { addSomeGold } = useScore();

  const handleDragStart = useCallback(() => {
    setTile((prev) => ({
      ...prev,
      isdragged: true,
      startingPosition: calcCenterPoint(pieceRef),
    }));
  }, [tile]);

  const handleDragEnd = useCallback(
    (event: PointerEvent) => {
      const nearestCell = findNearestCell(game, event, tile);

      if (!nearestCell) {
        addSomeGold(piece.sell);
        setTile((prev) => ({ ...prev, animationTrigger: true }));
        return;
      }

      setTile((prev) => ({
        ...prev,
        isDragged: false,
        dragEnd: true,
        nearestCell: nearestCell.cell,
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  const hidePiece = () => {
    addPieceToCell(tile.nearestCell, piece);
    setTile((prev) => ({ ...prev, show: false }));
  };

  return { tile, pieceRef, handleDragEnd, handleDragStart, hidePiece };
};

export default usePiece;
