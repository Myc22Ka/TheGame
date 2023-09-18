import { PanInfo, delay } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import options from "../config.json";
import { GameType, emptyCell, useGame } from "../contexts/GameContext";

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
  nearestCell: emptyCell,
  dragTime: { start: Date.now(), end: 0 },
  startingPosition: { x: 0, y: 0 },
  vector: { x: 0, y: 0 },
};

export const usePiece = () => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultState);
  const { game } = useGame();

  const handleDragStart = useCallback(() => {
    const rect = pieceRef.current?.getBoundingClientRect();

    let startingPosition = { x: 0, y: 0 };
    if (rect) startingPosition = { x: rect.x, y: rect.y };

    setTile((prev) => ({
      ...prev,
      isdragged: true,
      dragTime: { ...prev.dragTime, end: 0 },
      startingPosition: startingPosition,
    }));
  }, [tile]);

  const handleDragEnd = useCallback(
    (event: PointerEvent, info: PanInfo) => {
      const nearestCell = game.grid
        .map((cell) => {
          const rect = cell.ref?.current?.getBoundingClientRect();

          const v = [(rect?.x || 0) - event.x, (rect?.y || 0) - event.y];
          const w = [
            tile.startingPosition.x - event.x,
            tile.startingPosition.y - event.y,
          ];

          return {
            cell: cell,
            distance: Math.sqrt(
              Math.pow((rect?.x || 0) - event.x, 2) +
                Math.pow((rect?.y || 0) - event.y, 2)
            ),
            vector: {
              x: v[0] - w[0],
              y: v[1] - w[1],
            },
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      console.log(nearestCell.cell.ref);

      setTile((prev) => ({
        ...prev,
        isdragged: false,
        nearestCell: nearestCell.cell,
        dragTime: { ...prev.dragTime, end: Date.now() },
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  // useEffect(() => {
  //   console.log(tile);
  // }, [tile]);

  return { tile, pieceRef, handleDragEnd, handleDragStart };
};

export default usePiece;
