import { useState, useRef, useCallback } from "react";
import { useGame } from "src/contexts/GameContext";
import { defaultTile, findNearestCell, calcCenterPoint, defaultCords } from "src/modules/Piece/utils";
import { AnimationsType, PieceEventType, PieceType } from "src/modules/Piece/types";
import { useScore } from "src/contexts/ScoreContext";

export const usePiece = (piece: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell, updateGrid } = useGame();
  const { removeSomeGold, updateActivators, score, currentGameSpeed } = useScore();

  const handleDragStart = useCallback(() => {
    setTile((prev) => ({
      ...prev,
      startingPosition: pieceRef.current ? calcCenterPoint(pieceRef.current) : defaultCords,
      animate: "active",
    }));
  }, []);

  const handleDragEnd = useCallback(
    (event: PieceEventType, takeMoney: boolean) => {
      const piecePower = (piece.activators.power || [])[piece.level - 1];
      if (score.gameStats.power + piecePower < 0) {
        setTile((prev) => ({
          ...prev,
          animate: "return",
        }));
        return;
      }

      const nearestCell = findNearestCell(game, event, tile);

      if (!nearestCell) {
        setTile((prev) => ({
          ...prev,
          animate: "return",
        }));
        return;
      }
      if (takeMoney) removeSomeGold(piece.upgradeCost[piece.level - 1]);
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
    setTimeout(() => setTile({ ...defaultTile, animate: "reset" }), score.speed.pieceTransition * 1000);
  }, [tile]);

  const addToGrid = useCallback(() => {
    setTimeout(
      () => {
        const updatedGame = addPieceToCell(tile.nearestCell, piece);

        const newGrid = updateActivators(updatedGame);
        updateGrid(newGrid);

        if (piece.rule === "speed") currentGameSpeed();
        changePieceAnimation("exit");
      },
      (score.speed.pieceTransition - 0.2) * 1000
    );
  }, [tile, game]);

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
