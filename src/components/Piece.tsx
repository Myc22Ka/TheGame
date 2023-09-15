import React, { useEffect, useRef, useState, useMemo } from "react";
import { PanInfo, motion } from "framer-motion";
import { useGame } from "../contexts/GameContext";

type Component = {
  name: string;
};

const defaultComponent = {
  name: "",
};

const ARRAY_OF_COMPONENTS: Array<Component> = [
  { name: "component1" },
  { name: "component2" },
];

const Piece: React.FC = () => {
  const { game } = useGame();
  const ref = useRef<HTMLDivElement>(null);
  const [randomComponent, setRandomComponent] =
    useState<Component>(defaultComponent);

  const generateComponent = useMemo(() => {
    // xd because I want to make something truly random
    const randomBytes = new Uint8Array(4);
    self.crypto.getRandomValues(randomBytes);
    const seed =
      randomBytes[0] |
      (randomBytes[1] << 8) |
      (randomBytes[2] << 16) |
      (randomBytes[3] << 24);
    const randomIndex = Math.abs(seed) % ARRAY_OF_COMPONENTS.length;

    return ARRAY_OF_COMPONENTS[randomIndex];
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      setRandomComponent(generateComponent);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className={randomComponent.name}
      drag
      dragTransition={{ bounceStiffness: 600, bounceDamping: 100 }}
      ref={ref}
    >
      {randomComponent.name}
    </motion.div>
  );
};

export default Piece;
