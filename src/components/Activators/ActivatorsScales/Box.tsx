import React from "react";
import styles from "src/styles/style.module.scss";
import { motion } from "framer-motion";
import { useScore } from "src/contexts/ScoreContext";
import options from "src/config.json";
import { GameStats } from "src/modules/Game/types";

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
  const { currentGameSpeed } = useScore();

  return (
    <motion.div
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
        ease: "anticipate",
        // delay:
        //   currentGameSpeed({
        //     defaultTimeTick: options.time.defaultPieceTransition,
        //     devider: 10000 * delay.current,
        //   }) * i,
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
