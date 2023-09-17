import { PanInfo, delay } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import options from "../config.json";

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

const generateRandomPiece = () => {
  // xd because I want to make something truly random
  const randomBytes = new Uint8Array(4);
  self.crypto.getRandomValues(randomBytes);
  const seed =
    randomBytes[0] |
    (randomBytes[1] << 8) |
    (randomBytes[2] << 16) |
    (randomBytes[3] << 24);
  const randomIndex = Math.abs(seed) % ARRAY_OF_COMPONENTS.length;

  return ARRAY_OF_COMPONENTS[randomIndex];
};

const defaultState = {
  piece: defaultComponent,
  isdragged: false,
  animated: false,
  dragTime: { start: Date.now(), end: 0 },
};

export const usePiece = () => {
  const pieceRef = useRef<HTMLDivElement>(null);
  const [tile, setTile] = useState(defaultState);

  const handleDragStart = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      console.log("drag start");

      setTile((prev) => ({
        ...prev,
        isdragged: true,
        dragTime: { ...prev.dragTime, end: 0 },
      }));
    },
    [tile]
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      console.log("drag end");

      setTile((prev) => ({
        ...prev,
        isdragged: false,
        animated: true,
        dragTime: { ...prev.dragTime, end: Date.now() },
      }));
    },
    [tile]
  );

  useEffect(() => {
    let delay: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    let timeDilation: number;

    timeDilation = tile.dragTime.end - tile.dragTime.start;

    if (!tile.dragTime.end || tile.dragTime.end < tile.dragTime.start)
      timeDilation = 0;

    console.log(options.tiles.pieceCycleTime - timeDilation);
    // if (tile.animated) setTile(defaultState);

    if (!tile.isdragged) {
      interval = setInterval(() => {
        setTile((prev) => ({ ...prev, piece: generateRandomPiece() }));
      }, options.tiles.pieceCycleTime - timeDilation);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(delay);
    };
  }, [tile]);

  return { tile, pieceRef, handleDragEnd, handleDragStart };
};

export default usePiece;
