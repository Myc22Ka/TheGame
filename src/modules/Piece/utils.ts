import { PieceType } from "./types";
import {
  Cords,
  DefaultCycleType,
  GridEntry,
  NearestCellType,
  TileType,
} from "./types";
import options from "../../config.json";
import { GameType } from "../Game/types";
import { TrashcanType } from "../../contexts/TrashcanContext";

const emptyPiece: PieceType = {
  name: "",
  sell: 0,
  buy: 0,
  rule: "",
  level: 0,
};

const emptyCell: GridEntry = {
  insideCell: emptyPiece,
  ref: null,
  isEmpty: true,
  animate: "inactive",
};

const initGameState: GameType = {
  gameOver: false,
  grid: Array(Math.pow(options.grid.size, 2)).fill(emptyCell),
  currentGridSize: options.grid.size,
  trashCan: {
    ref: null,
    animate: "none",
    amount: options.trashMaxAmount,
  },
};

const defaultCords: Cords = { x: 0, y: 0 };

const defaultTile: TileType = {
  nearestCell: emptyCell,
  startingPosition: defaultCords,
  vector: defaultCords,
  animate: "active",
};

const defaultCycle: DefaultCycleType = {
  piece: generateRandomPiece(),
  time: options.pieces.cycleTime,
  show: true,
  animate: "",
};

// Piece variables
const pieceVariants = {
  initial: { scale: 0 },
  active: { scale: 1, rotate: 0 },
  drag: { scale: 0, rotate: 270 },
  return: {
    scale: 1,
    rotate: 0,
  },
  sell: {
    scale: 0,
    rotate: 45,
    radius: "50%",
  },
  exit: { scale: 0, rotate: 0, radius: 0 },
};

const pieceTransition = {
  duration: 0.7,
  ease: "anticipate",
};

/**
 * Finds the nearest empty cell in the game grid to a given event position.
 *
 * @param {GameType} game - The game instance.
 * @param {PointerEvent} event - The pointer event containing the position.
 * @param {TileType} tile - The tile to find the nearest cell for.
 * @returns {NearestCellType} An object containing the nearest empty cell, its distance, and vector.
 */
const findNearestCell = (
  game: GameType,
  event: PointerEvent,
  tile: TileType
): NearestCellType => {
  return game.grid
    .filter((cell) => cell.isEmpty)
    .map((cell) => {
      if (!cell.ref)
        return { cell: emptyCell, distance: 0, vector: defaultCords };

      const centerPoint = calcCenterPoint(cell.ref);

      return {
        cell: cell,
        distance: Math.sqrt(
          Math.pow(centerPoint.x - event.x, 2) +
            Math.pow(centerPoint.y - event.y, 2)
        ),
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
 * Checks if Piece is able to be sold.
 *
 * @param {GameType} game - The game instance.
 * @param {PointerEvent} event - The pointer event containing the position.
 * @returns {boolean} A boolean value representing if Piece can be sold.
 */
const possibleToSell = (
  trashcan: TrashcanType,
  event: PointerEvent
): boolean => {
  if (!trashcan.ref) return false;
  const trashcanPos = calcCenterPoint(trashcan.ref);

  return [trashcanPos.x - event.x, trashcanPos.y - event.y].every(
    (e) => Math.abs(e) < options.grid.maxTrashDistance
  );
};

/**
 * Calculates center point of an HTML element.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - The reference to the HTML element.
 * @returns {Cords} An object representing the x and y coordinates of center.
 */
const calcCenterPoint = (ref: React.RefObject<HTMLDivElement>): Cords => {
  const rect = ref.current?.getBoundingClientRect();

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
  return options.pieces.types[
    Math.floor(Math.random() * options.pieces.types.length)
  ];
}

/**
 * Generates an array of cycle steps.
 *
 * @returns {DefaultCycleType[]} An array of steps for the cycle.
 */
const setCycleSteps = (): DefaultCycleType[] => {
  const newPiece = generateRandomPiece();
  const cycle: DefaultCycleType = { ...defaultCycle, piece: newPiece };

  const restArray = Array.from({ length: defaultCycle.time }, (_, i) => ({
    ...cycle,
    time: i + 1,
  })).reverse();

  return [
    { ...cycle, piece: newPiece },
    ...restArray.slice(1),
    { ...cycle, time: 0, animate: "exit" as "exit" },
    { ...cycle, time: 0, show: false },
  ];
};

export {
  calcCenterPoint,
  findNearestCell,
  defaultTile,
  generateRandomPiece,
  pieceTransition,
  pieceVariants,
  possibleToSell,
  defaultCycle,
  setCycleSteps,
  emptyPiece,
  emptyCell,
  initGameState,
};
