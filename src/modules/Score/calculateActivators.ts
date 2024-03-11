import { checkCombos } from "../Game/checkCombos";
import options from "src/config.json";
import { GridEntry } from "../Grid/types";
import { GameStatsType } from "./types";

const calculateActivators = (grid: GridEntry[]) => {
  const sumsOfActivators: GameStatsType = { ...options.score.gameStats };

  grid.forEach((entry) => {
    if (!entry.isDestroyed) {
      const insideCell = entry.insideCell;
      const activators = insideCell.activators;
      for (const key in activators) {
        const activator = key as Exclude<keyof GameStatsType, "default">;
        sumsOfActivators[activator] =
          (sumsOfActivators[activator] || 0) + (activators[activator] || [])[insideCell.level - 1];
      }
    }
    entry.insideCell.comboShape = [];
  });

  const uniqueRules = Array.from(
    new Set(grid.map((entry) => entry.insideCell.rule).filter((rule) => rule !== "default"))
  );

  for (const rule of uniqueRules) {
    const combos = checkCombos(grid, rule);

    combos.results.forEach((result) => {
      result.ids.forEach((id) => {
        grid[id].insideCell.comboShape = result.shape.map((row) =>
          row.map((col) => ({ value: col, id: col === 1 ? id : -1 }))
        );
      });
    });

    for (const activatorKey of Object.keys(combos.activators).filter((key) => key !== "default")) {
      sumsOfActivators[activatorKey as keyof GameStatsType] += combos.activators[activatorKey as keyof GameStatsType];
    }
  }

  return sumsOfActivators;
};

export { calculateActivators };
