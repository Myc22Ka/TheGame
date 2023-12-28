import { ActivatorsType } from "../../contexts/ScoreContext";
import { GridEntry } from "../Grid/types";
import options from "../../config.json";

type Roles = keyof typeof options.score.gameStats | "";

type AnimationsType =
  | "active"
  | "drag"
  | "return"
  | "exit"
  | "reset"
  | "inactive";

type Cords = {
  x: number;
  y: number;
};

type PieceType = {
  description: string;
  buy: number;
  rule: Roles;
  level: number;
  uses: number;
  id: number;
  activators: ActivatorsType;
};

type TileType = {
  nearestCell: GridEntry;
  startingPosition: Cords;
  vector: Cords;
  animate: AnimationsType;
};

type NearestCellType = {
  cell: GridEntry;
  distance: number;
  vector: Cords;
};

type DefaultCycleType = {
  piece: PieceType;
  time: number;
  speed: number;
  show: boolean;
  animate: "" | "exit";
};

type PieceEventType = PointerEvent | MouseEvent | TouchEvent;

export type {
  Cords,
  TileType,
  NearestCellType,
  DefaultCycleType,
  PieceType,
  GridEntry,
  AnimationsType,
  PieceEventType,
  Roles,
};
