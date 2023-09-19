import { useState, useRef, useCallback } from "react";
import { emptyCell, useGame } from "../contexts/GameContext";

type PieceType = {
  name: string;
};

type Cords = {
  x: number;
  y: number;
};

const defaultPiece: PieceType = {
  name: "component1",
};

const ARRAY_OF_COMPONENTS: PieceType[] = [
  { name: "component1" },
  { name: "component2" },
];

const defaultState = {
  piece: defaultPiece,
  isdragged: false,
  nearestCell: emptyCell,
  dragTime: { start: Date.now(), end: 0 },
  startingPosition: { x: 0, y: 0 },
  vector: { x: 0, y: 0 },
};

const getFixedRectPosition = (ref: React.RefObject<HTMLDivElement>): Cords => {
  const rect = ref.current?.getBoundingClientRect();

  let position = { x: 0, y: 0 };
  if (rect)
    position = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

  return position;
};

export const usePiece = () => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultState);
  const { game } = useGame();

  const handleDragStart = useCallback(() => {
    setTile((prev) => ({
      ...prev,
      isdragged: true,
      dragTime: { ...prev.dragTime, end: 0 },
      startingPosition: getFixedRectPosition(pieceRef),
    }));
  }, [tile]);

  const handleDragEnd = useCallback(
    (event: PointerEvent) => {
      const nearestCell = game.grid
        .map((cell) => {
          if (!cell.ref)
            return { cell: emptyCell, distance: 0, vector: { x: 0, y: 0 } };

          const fixedRect = getFixedRectPosition(cell.ref);

          return {
            cell: cell,
            distance: Math.sqrt(
              Math.pow(fixedRect.x - event.x, 2) +
                Math.pow(fixedRect.y - event.y, 2)
            ),
            vector: {
              x: fixedRect.x - tile.startingPosition.x,
              y: fixedRect.y - tile.startingPosition.y,
            },
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];

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

  return { tile, pieceRef, handleDragEnd, handleDragStart };
};

export default usePiece;
