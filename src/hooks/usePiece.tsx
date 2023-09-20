import { useState, useRef, useCallback } from "react";
import { PieceType, emptyCell, useGame } from "../contexts/GameContext";
import { useScore } from "../contexts/ScoreContext";

type Cords = {
  x: number;
  y: number;
};

const defaultState = {
  isdragged: false,
  show: true,
  nearestCell: emptyCell,
  dragEnd: false,
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

export const usePiece = (piece: PieceType) => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultState);
  const { game, addPieceToCell } = useGame();
  const { addSomeGold } = useScore();

  const handleDragStart = useCallback(() => {
    setTile((prev) => ({
      ...prev,
      isdragged: true,
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
        .filter((entry) => entry.cell.isEmpty)
        .sort((a, b) => a.distance - b.distance)[0];

      if (!nearestCell) {
        addSomeGold(piece.sell);
        setTile((prev) => ({ ...prev, show: false }));
        return;
      }

      setTile((prev) => ({
        ...prev,
        isdragged: false,
        nearestCell: nearestCell.cell,
        dragEnd: true,
        vector: nearestCell.vector,
      }));
    },
    [tile]
  );

  const hidePiece = () => {
    addPieceToCell(tile.nearestCell, piece);
    setTile((prev) => ({ ...prev, show: false }));
  };

  // useEffect(() => {
  //   console.log(tile);
  // }, [tile]);

  return { tile, pieceRef, handleDragEnd, handleDragStart, hidePiece };
};

export default usePiece;
