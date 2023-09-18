import { PanInfo, delay } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import options from "../config.json";
import { GameType, useGame } from "../contexts/GameContext";

type PieceType = {
  name: string;
};

const defaultComponent: PieceType = {
  name: "component1",
};

const ARRAY_OF_COMPONENTS: PieceType[] = [
  { name: "component1" },
  { name: "component2" },
];

const defaultState = {
  piece: defaultComponent,
  isdragged: false,
  animate: { x: 0, y: 0 },
  dragTime: { start: Date.now(), end: 0 },
  point: { x: 0, y: 0 },
};

export const usePiece = () => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultState);
  const { game } = useGame();

  const handleDragStart = useCallback(() => {
    const rect = pieceRef.current?.getBoundingClientRect();

    let point = { x: 0, y: 0 };
    if (rect) point = { x: rect.x, y: rect.y };

    setTile((prev) => ({
      ...prev,
      isdragged: true,
      dragTime: { ...prev.dragTime, end: 0 },
      point: point,
    }));
  }, [tile]);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const nearestCell = game.grid
        .map((cell) => {
          const rect = cell.ref?.current?.getBoundingClientRect();
          return {
            cell: cell,
            distance: Math.sqrt(
              Math.pow((rect?.x || 0) - tile.point.x, 2) +
                Math.pow((rect?.y || 0) - tile.point.y, 2)
            ),
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      console.log(nearestCell);

      setTile((prev) => ({
        ...prev,
        isdragged: false,
        dragTime: { ...prev.dragTime, end: Date.now() },
      }));
    },
    [tile]
  );

  useEffect(() => {
    console.log(tile);
  }, [tile]);

  return { tile, pieceRef, handleDragEnd, handleDragStart };
};

export default usePiece;
