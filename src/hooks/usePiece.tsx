import { useState, useRef, useCallback } from "react";
import { useGame } from "../contexts/GameContext";
import {
  defaultTile,
  findNearestCell,
  calcCenterPoint,
  defaultCords,
} from "../modules/Piece/utils";
import { PieceType } from "../modules/Piece/types";

export const usePiece = (p: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell } = useGame();

  const handleDragStart = useCallback(() => {
    if (pieceRef.current)
      setTile((prev) => ({
        ...prev,
        startingPosition: pieceRef.current
          ? calcCenterPoint(pieceRef.current)
          : defaultCords,
        animate: "active",
      }));
  }, []);

  const handleDragEnd = useCallback(
    (event: PointerEvent) => {
      const nearestCell = findNearestCell(game, event, tile);

      if (!nearestCell) {
        setTile((prev) => ({
          ...prev,
          animate: "return",
        }));
        return;
      }

      setTile((prev) => ({
        ...prev,
        animate: "drag",
        nearestCell: nearestCell.cell,
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  const addToGrid = useCallback(() => {
    addPieceToCell(tile.nearestCell, p);
  }, [tile]);

  const resetCycle = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "exit" }));
  }, [tile]);

  const unlockPiece = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "active" }));
  }, [tile]);

  return {
    tile,
    pieceRef,
    handleDragEnd,
    handleDragStart,
    addToGrid,
    resetCycle,
    unlockPiece,
  };
};

export default usePiece;
