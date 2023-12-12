import { useState, useRef, useCallback } from "react";
import { useGame } from "../contexts/GameContext";
import {
  defaultTile,
  findNearestCell,
  calcCenterPoint,
  defaultCords,
} from "../modules/Piece/utils";
import { PieceType } from "../modules/Piece/types";
import { useScore } from "../contexts/ScoreContext";

export const usePiece = (p: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell } = useGame();
  const { removeSomeGold } = useScore();

  const handleDragStart = useCallback(() => {
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

  const handleDragEndWithSell = useCallback(
    (event: PointerEvent) => {
      const nearestCell = findNearestCell(game, event, tile);

      if (!nearestCell) {
        setTile((prev) => ({
          ...prev,
          animate: "return",
        }));
        return;
      }

      removeSomeGold(p.buy);
      setTile((prev) => ({
        ...prev,
        animate: "drag",
        nearestCell: nearestCell.cell,
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  const resetValues = useCallback(() => {
    setTile({ ...defaultTile, animate: "reset" });
  }, [tile]);

  const addToGrid = useCallback(() => {
    setTimeout(() => {
      addPieceToCell(tile.nearestCell, p);
    }, 500);
  }, [tile]);

  const resetCycle = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "exit" }));
  }, [tile]);

  const unlockPiece = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "inactive" }));
  }, [tile]);

  return {
    tile,
    pieceRef,
    handleDragEnd,
    handleDragEndWithSell,
    handleDragStart,
    addToGrid,
    resetCycle,
    unlockPiece,
    resetValues,
  };
};

export default usePiece;
