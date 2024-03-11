import { PieceEventType, PieceType, PieceRules } from "./types";
import { Cords, DefaultCycleType, NearestCellType, TileType } from "./types";
import options from "../../config.json";
import { GameType } from "../Game/types";
import { Variants } from "framer-motion";
import { emptyCell } from "../Game/emptyCell";
import { rules } from "../Game/rules";

const range = options.pieces.types.map((piece) => piece.range);

const piecesRangeValues: { rule: PieceRules; range: number[] }[] = rules.map((rule, index) => ({
  rule: rule,
  range: range[index],
}));

const defaultCords: Cords = { x: 0, y: 0 };

const defaultTile: TileType = {
  nearestCell: emptyCell,
  startingPosition: defaultCords,
  vector: defaultCords,
  animate: "inactive",
};

const defaultCycle: DefaultCycleType = {
  piece: generateRandomPiece(),
  time: options.pieces.cycleTime,
  show: true,
  animate: "",
};

// Piece variables
const pieceVariants: Variants = {
  initial: {
    scale: 0,
    rotate: 0,
  },
  active: { scale: 1, rotate: 0, zIndex: 10 },
  inactive: { scale: 1, rotate: 0, zIndex: 1 },
  drag: { scale: 0, rotate: [360, 0] },
  return: {
    scale: 1,
    rotate: 0,
    zIndex: 2,
  },
  reset: {
    scale: 1,
    rotate: 0,
    zIndex: 2,
  },
  exit: { scale: 0, rotate: 0, zIndex: 2 },
};

/**
 * Finds the nearest empty cell in the game grid to a given event position.
 *
 * @param {GameType} game - The game instance.
 * @param {PointerEvent} event - The pointer event containing the position.
 * @param {TileType} tile - The tile to find the nearest cell for.
 * @returns {NearestCellType} An object containing the nearest empty cell, its distance, and vector.
 */
const findNearestCell = (game: GameType, event: PieceEventType, tile: TileType): NearestCellType => {
  return game.grid
    .filter((cell) => cell.isEmpty)
    .map((cell) => {
      if (!cell.ref || event instanceof TouchEvent) return { cell: emptyCell, distance: 0, vector: defaultCords };

      const centerPoint = calcCenterPoint(cell.ref);

      return {
        cell: cell,
        distance: Math.sqrt(Math.pow(centerPoint.x - event.x, 2) + Math.pow(centerPoint.y - event.y, 2)),
        vector: {
          x: centerPoint.x - tile.startingPosition.x,
          y: centerPoint.y - tile.startingPosition.y,
        },
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .filter((cell) => cell.distance < options.grid.maxDragDistance)[0];
};

/**
 * Calculates center point of an HTML element.
 *
 * @param {HTMLDivElement} ref - The reference to the HTML element.
 * @returns {Cords} An object representing the x and y coordinates of center.
 */
const calcCenterPoint = (ref: HTMLDivElement): Cords => {
  const rect = ref.getBoundingClientRect();

  let position = defaultCords;
  if (rect)
    position = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

  return position;
};

/**
 * Generates random Piece from an array of Pieces.
 *
 * @returns {PieceType} Random Piece object.
 */
function generateRandomPiece(): PieceType {
  return options.pieces.types[Math.floor(Math.random() * options.pieces.types.length)] as unknown as PieceType;
}

/**
 * Generates an array of cycle steps.
 *
 * @returns {DefaultCycleType[]} An array of steps for the cycle.
 */
const setCycleSteps = (currentIndex: number): DefaultCycleType[] => {
  const restArray = Array.from({ length: defaultCycle.time }, (_, i) => ({
    ...defaultCycle,
    time: i + 1,
  })).reverse();

  if (currentIndex === restArray.length + 1) defaultCycle.piece = generateRandomPiece();

  return [
    defaultCycle,
    ...restArray.slice(1),
    { ...defaultCycle, time: 0, animate: "exit" as "exit" },
    { ...defaultCycle, time: 0, show: false },
  ];
};

export {
  calcCenterPoint,
  findNearestCell,
  defaultTile,
  defaultCords,
  generateRandomPiece,
  pieceVariants,
  defaultCycle,
  setCycleSteps,
  piecesRangeValues,
};
