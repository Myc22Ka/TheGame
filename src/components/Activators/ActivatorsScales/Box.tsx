import React from "react";
import styles from "src/styles/style.module.scss";
import { motion } from "framer-motion";
import { useScore } from "src/contexts/ScoreContext";
import { GameStats } from "src/modules/Game/rules";

const variants = {
  active: {
    scale: 1,
    x: 0,
  },
  inactive: {
    scale: 0,
    x: -50,
  },
};

type BoxPropsType = {
  delay: React.MutableRefObject<number>;
  show: boolean;
  value: number;
  activator: GameStats;
  i: number;
};

const Box: React.FC<BoxPropsType> = ({ delay, show, value, activator, i }) => {
  const { score } = useScore();
  return (
    <motion.div
      transition={{
        duration: score.speed.pieceTransition,
        ease: "anticipate",
        delay: score.speed.tick * 0.001 * delay.current * i,
      }}
      initial="inactive"
      animate={show ? "active" : "inactive"}
      variants={variants}
      className="activator-value"
      style={{
        backgroundColor: value < 0 ? styles.disabled : styles[activator],
      }}
    />
  );
};

export default Box;
