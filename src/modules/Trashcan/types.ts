type TrashCanType = {
  ref: React.RefObject<HTMLDivElement> | null;
  animate: "fade" | "bounce" | "none";
  amount: number;
};

export type { TrashCanType };
