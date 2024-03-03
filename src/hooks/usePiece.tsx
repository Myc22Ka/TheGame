import { useState, useRef, useCallback } from "react";
import { useGame } from "src/contexts/GameContext";
import { defaultTile, findNearestCell, calcCenterPoint, defaultCords } from "src/modules/Piece/utils";
import { AnimationsType, PieceEventType, PieceType } from "src/modules/Piece/types";
import { useScore } from "src/contexts/ScoreContext";
import options from "src/config.json";

export const usePiece = (piece: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell, updateGrid } = useGame();
  const { removeSomeGold, updateActivators, currentGameSpeed, score } = useScore();

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
    setTimeout(() => setTile({ ...defaultTile, animate: "reset" }), currentGameSpeed({ devider: 1 }));
  }, [tile]);

  const addToGrid = useCallback(() => {
    const { defaultPieceTransition } = options.time;

    const addToGridDelay =
      (currentGameSpeed({
        defaultTimeTick: defaultPieceTransition,
        devider: 1000,
      }) -
        0.2) *
      1000;

    setTimeout(() => {
      const updatedGame = addPieceToCell(tile.nearestCell, piece);

      updateActivators(piece, updatedGame);

      changePieceAnimation("exit");
    }, addToGridDelay);
  }, [tile, currentGameSpeed, game]);

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
