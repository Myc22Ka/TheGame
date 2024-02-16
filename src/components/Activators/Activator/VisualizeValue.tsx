import React, { useRef } from "react";
import { GameStats } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import { motion } from "framer-motion";
import { useScore } from "src/contexts/ScoreContext";
import options from "src/config.json";

type VisualizeValuePropsType = {
  activator: GameStats;
  value: number;
  show: boolean;
};

const calcLength = (activator: GameStats, value: number, delay: React.MutableRefObject<number>) => {
  const foundPiece = options.pieces.types.find((e) => e.rule === activator);
  const closest = foundPiece
    ? foundPiece.range.reduce((prev, curr) =>
        Math.abs(curr - Math.abs(value)) < Math.abs(prev - Math.abs(value)) ? curr : prev
      )
    : undefined;
  const result = foundPiece ? foundPiece.range.findIndex((e) => e === closest) + 1 : 0;
  delay.current = result;

  return { index: result, range: foundPiece?.range.length || 0 };
};

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

const VisualizeValue: React.FC<VisualizeValuePropsType> = ({ activator, value, show }) => {
  const { currentGameSpeed } = useScore();
  const delay = useRef(-1);
  const foundPiece = useRef(calcLength(activator, value, delay));

  return (
    <Stack direction="horizontal" gap={1}>
      {Array.from(Array(foundPiece.current.range).keys()).map((_, i) => {
        if (foundPiece.current.range - foundPiece.current.index > i)
          return (
            <div
              className="activator-value"
              key={i}
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          );
        return (
          <motion.div
            transition={{
              duration: currentGameSpeed({
                defaultTimeTick: options.time.defaultPieceTransition,
                devider: 1000,
              }),
              ease: "anticipate",
              delay:
                currentGameSpeed({
                  defaultTimeTick: options.time.defaultPieceTransition,
                  devider: 10000 * delay.current,
                }) * i,
            }}
            initial="inactive"
            animate={show ? "active" : "inactive"}
            variants={variants}
            className="activator-value"
            style={{
              backgroundColor: value < 0 ? styles.disabled : styles[activator],
            }}
            key={i}
          ></motion.div>
        );
      })}
    </Stack>
  );
};

export default VisualizeValue;
