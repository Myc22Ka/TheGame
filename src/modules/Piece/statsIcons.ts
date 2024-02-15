import {
  IconDefinition,
  faArrowsDownToLine,
  faBan,
  faBolt,
  faClover,
  faForwardFast,
  faGaugeHigh,
  faLightbulb,
  faMoneyBillTrendUp,
  faShieldCat,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { GameStats, PieceRules } from "./types";
import { rules } from "../Game/utils";

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
  [key in GameStats]: IconDefinition;
};

const statsIcons: StatsIconType = {} as StatsIconType;

rules.forEach((rule, index) => {
  statsIcons[rule as GameStats] = icons[index];
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
