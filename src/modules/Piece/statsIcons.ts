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

const statsIcons: StatsIconType = {} as StatsIconType;

rules.forEach((rule, index) => {
  statsIcons[rule as GameStats] = icons[index];
});

statsIcons["destroyChance"] = faExclamationTriangle;

type PieceIconType = {
  [key in PieceRules]: IconDefinition;
};

const piecesIcons: PieceIconType = {
  ...statsIcons,
  booster: faStar,
  ads_remover: faBan,
};

export { statsIcons, piecesIcons };
