import React from "react";
import { motion } from "framer-motion";

const defaultAnimation = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

type CharakterPropsType = {
  children: React.ReactNode;
};

const Character: React.FC<CharakterPropsType> = ({ children }) => {
  return (
    <motion.span style={{ display: "inline-block", whiteSpace: "pre-wrap" }} variants={defaultAnimation}>
      {children}
    </motion.span>
  );
};

export default Character;
