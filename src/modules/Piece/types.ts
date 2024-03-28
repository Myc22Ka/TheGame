import { GridEntry } from "../Game/emptyCell";
import { GameStats } from "../Game/rules";
import { ActivatorsType } from "../Score/types";

type ExtraRules = "booster" | "ads_remover";

type PieceRules = GameStats | ExtraRules;

type AnimationsType = "active" | "drag" | "return" | "exit" | "reset" | "inactive";

type Cords = {
  x: number;
  y: number;
};

type PieceType = {
  description: string;
  name: string;
  upgradeCost: number[];
  destroyChance: number[];
  rule: PieceRules;
  level: number;
  uses: number;
  id: number;
  activators: ActivatorsType;
  comboShape: { value: number; id: number }[][];
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
