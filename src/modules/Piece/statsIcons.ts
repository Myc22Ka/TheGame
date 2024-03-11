import {
  IconDefinition,
  faArrowsDownToLine,
  faBan,
  faBolt,
  faClover,
  faExclamationTriangle,
  faForwardFast,
  faGaugeHigh,
  faLightbulb,
  faMoneyBillTrendUp,
  faShieldCat,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { GameStats, PieceRules } from "./types";
import { rules } from "../Game/rules";

const icons = [
  faGaugeHigh,
  faMoneyBillTrendUp,
  faBolt,
  faClover,
  faForwardFast,
  faArrowsDownToLine,
  faShieldCat,
  faLightbulb,
];

type StatsIconType = {
  [key in GameStats | "destroyChance"]: IconDefinition;
};

const statsIcons = {} as StatsIconType;

rules.forEach((rule, index) => {
  if (typeof rule === "string") {
    statsIcons[rule as GameStats] = icons[index];
    return;
  }

  statsIcons["destroyChance"] = icons[index];
});

type PieceIconType = {
  [key in PieceRules]: IconDefinition;
};

const piecesIcons: PieceIconType = {
  ...statsIcons,
  booster: faStar,
  ads_remover: faBan,
};

export { statsIcons, piecesIcons };
