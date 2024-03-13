import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { PieceRules } from "src/modules/Piece/types";

export const useSpecialAbilities = (rule: PieceRules, level: number) => {
  const { score, changeSpeed } = useScore();
  const { game } = useGame();

  const giveAbility = () => {
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

  const speedAbility = () => {
    changeSpeed({ timerMult: (level * 2) / 3 });
  };

  return { giveAbility };
};
