import { useState, useRef, useCallback } from "react";
import { useGame } from "../contexts/GameContext";
import {
  defaultTile,
  findNearestCell,
  calcCenterPoint,
  defaultCords,
} from "../modules/Piece/utils";
import {
  AnimationsType,
  PieceEventType,
  PieceType,
} from "../modules/Piece/types";
import { useScore } from "../contexts/ScoreContext";
import { getPieceTransition } from "../modules/game_utils";
import { useMarket } from "../contexts/MarketContext";

export const usePiece = (piece: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell } = useGame();
  const { removeSomeGold, updateActivators, score } = useScore();

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
    (event: PieceEventType, takeMoney: boolean) => {
      const nearestCell = findNearestCell(game, event, tile);

      if (!nearestCell) {
        setTile((prev) => ({
          ...prev,
          animate: "return",
        }));
        return;
      }
      if (takeMoney) removeSomeGold(piece.buy);
      setTile((prev) => ({
        ...prev,
        animate: "drag",
        nearestCell: nearestCell.cell,
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  const setDefaultValues = useCallback(() => {
    setTile({ ...defaultTile, animate: "reset" });
  }, [tile]);

  const addToGrid = useCallback(() => {
    setTimeout(
      () => {
        addPieceToCell(tile.nearestCell, piece);
        updateActivators(piece.activators);
        changePieceAnimation("exit");
      },
      (getPieceTransition(score).duration - 0.2) * 1000
    );
  }, [tile]);

  const changePieceAnimation = useCallback(
    (animationName: AnimationsType) => {
      setTile((prev) => ({ ...prev, animate: animationName }));
    },
    [setTile]
  );

  return {
    tile,
    pieceRef,
    handleDragEnd,
    handleDragStart,
    addToGrid,
    setDefaultValues,
    changePieceAnimation,
  };
};

export default usePiece;
