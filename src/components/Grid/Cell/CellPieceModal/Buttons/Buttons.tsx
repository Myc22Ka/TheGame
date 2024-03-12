import React from "react";
import { Modal, Stack } from "react-bootstrap";
import RepairButton from "./RepairButton";
import LevelUpButton from "./LevelUpButton";
import { Variants } from "framer-motion";
import styles from "src/styles/style.module.scss";
import { ScoreType } from "src/modules/Score/types";

export const variants: Variants = {
  active: { backgroundColor: styles.active },
  inactive: { backgroundColor: styles.secondary },
};

export const buttonVariants = {
  reject: { scale: 1, x: [0, -2.5, 2.5, -1.25, 1.25, 0], rotate: [0, -2.5, 2.5, -1.25, 1.25, 0] },
  success: { scale: [1, 1.1, 1], x: [0, 0] },
};

export const transition = (score: ScoreType) => {
  return {
    duration: score.speed.rejectTime,
    ease: "easeInOut",
  };
};

type ButtonsPropsType = {
  handleClose: () => void;
};

const Buttons: React.FC<ButtonsPropsType> = ({ handleClose }) => {
  return (
    <>
      <hr className="hr" />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Stack className="justify-content-between" direction="horizontal">
          <RepairButton handleClose={handleClose} />
          <LevelUpButton handleClose={handleClose} />
        </Stack>
      </Modal.Body>
    </>
  );
};

export default Buttons;
