import { useState, useRef, useCallback } from "react";
import { useGame } from "../contexts/GameContext";
import { useScore } from "../contexts/ScoreContext";
import {
  defaultTile,
  findNearestCell,
  calcCenterPoint,
  possibleToSell,
} from "../modules/Piece/utils";
import { PieceType } from "../modules/Piece/types";
import { useTrashcan } from "../contexts/TrashcanContext";

export const usePiece = (p: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultTile);
  const { game, addPieceToCell } = useGame();
  const { setActiveTrashcan, trashcan, setDragState, setInitialTrashcanState } =
    useTrashcan();
  const { addSomeGold, removeSomeGold, score } = useScore();

  const handleDragStart = useCallback((useTrashcan: boolean) => {
    setTile((prev) => ({
      ...prev,
      startingPosition: calcCenterPoint(pieceRef),
      animate: "active",
    }));

    useTrashcan ? setDragState(true) : removeSomeGold(p.buy);
  }, []);

  const handleDragEnd = useCallback(
    (event: PointerEvent, useTrashcan: boolean) => {
      const nearestCell = findNearestCell(game, event, tile);
      if (useTrashcan) setDragState(false);

      if (!nearestCell) {
        if (
          possibleToSell(trashcan, event) &&
          tile.animate !== "exit" &&
          useTrashcan
        ) {
          sellPiece();
          setActiveTrashcan("bounce");
          return;
        }

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

  const handleDragEndWithoutSell = useCallback(
    (event: PointerEvent) => {
      const nearestCell = findNearestCell(game, event, tile);
      setDragState(false);

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

  const sellPiece = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "sell" }));
    addSomeGold(p.sell);
  }, [tile]);

  const resetCycle = useCallback(() => {
    if (trashcan.animate !== "none") setInitialTrashcanState();
    setTile((prev) => ({ ...prev, animate: "exit" }));
  }, [tile, trashcan]);

  const unlockPiece = useCallback(() => {
    setTile((prev) => ({ ...prev, animate: "active" }));
  }, [tile]);

  return {
    tile,
    pieceRef,
    handleDragEnd,
    handleDragEndWithoutSell,
    handleDragStart,
    addToGrid,
    resetCycle,
    unlockPiece,
  };
};

export default usePiece;
