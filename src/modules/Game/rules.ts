import options from "src/config.json";

type GameStats = keyof typeof options.score.gameStats | "default";

const rules: GameStats[] = Object.keys(options.score.gameStats) as GameStats[];

export { rules };
export type { GameStats };
