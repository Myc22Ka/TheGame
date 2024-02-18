import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";
import PieceCostPower from "./PieceCostPower";
import { motion } from "framer-motion";

const buttonVariants = {
  reject: { scale: 1, x: [0, -2.5, 2.5, -1.25, 1.25, 0], rotate: [0, -2.5, 2.5, -1.25, 1.25, 0] },
  success: { scale: [1, 1.1, 1], x: [0, 0] },
};

type RepairButtonPropsType = {
  handleClose: () => void;
};

const RepairButton: React.FC<RepairButtonPropsType> = ({ handleClose }) => {
  const { repairPiece } = useGame();
  const { score, updateActivators, currentGameSpeed } = useScore();
  const { cell } = useCell();

  const handleRepair = () => {
    if (score.gameStats.power <= 0 || !cell.isDestroyed) return;

    handleClose();

    repairPiece(cell);
    updateActivators(cell.insideCell);
  };

  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      <motion.div
        whileTap={!cell.isDestroyed ? buttonVariants.reject : buttonVariants.success}
        transition={{
          duration: currentGameSpeed({ devider: 6000 }),
          ease: "easeInOut",
        }}
      >
        <Button variant={`main${cell.isDestroyed ? "-active" : ""}`} onClick={handleRepair}>
          <Stack gap={3} direction="horizontal">
            <FontAwesomeIcon icon={faWrench} shake={cell.isDestroyed} />
            <span>Repair</span>
          </Stack>
        </Button>
      </motion.div>
      <PieceCostPower disabled={!cell.isDestroyed || score.gameStats.power <= 0} />
    </Stack>
  );
};

export default RepairButton;
