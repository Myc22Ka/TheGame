import React from "react";
import { useCell } from "src/contexts/CellContext";
import styles from "src/styles/style.module.scss";
import { motion } from "framer-motion";
import { scale } from "src/components/Animations/Variants/scale";

type LevelPropsType = {
  e: number;
};

const Level: React.FC<LevelPropsType> = ({ e }) => {
  const { cell } = useCell();

  return (
    <motion.div
      variants={scale}
      className="level"
      style={{
        opacity: e / cell.insideCell.upgradeCost.length,
        backgroundColor: e <= cell.insideCell.level ? styles[cell.insideCell.rule] : "none",
        border: `2px solid ${styles[cell.insideCell.rule]}`,
      }}
    />
  );
};

export default Level;
