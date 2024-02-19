import React from "react";
import { Modal } from "react-bootstrap";
import Character from "./Character";
import { motion } from "framer-motion";

type TitlePropsType = {
  title: string;
};

const Title: React.FC<TitlePropsType> = ({ title }) => {
  return (
    <Modal.Title className="my-2">
      <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.04 }}>
        {title.split("").map((char, key) => {
          return <Character key={key}>{char}</Character>;
        })}
      </motion.div>
    </Modal.Title>
  );
};

export default Title;
