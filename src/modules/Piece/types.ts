import { GridEntry } from "../Grid/types";
import { ActivatorsType } from "../Score/types";
import { GameStats } from "../Game/types";

type ExtraRules = "booster" | "ads_remover";

type PieceRules = GameStats | ExtraRules;

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
  name: string;
  buy: number;
  rule: GameStats;
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
  GameStats,
  PieceRules,
};
