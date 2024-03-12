import { PieceRules } from "src/modules/Piece/types";

const specialAbilities = (rule: PieceRules) => {
  switch (rule) {
    case "multiplier":
      return;
    case "speed":
      speedAbility();
      break;
    default:
      break;
  }
};

export { specialAbilities };

const speedAbility = () => {};
