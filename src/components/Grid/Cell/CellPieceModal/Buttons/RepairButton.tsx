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
import { buttonVariants, variants } from "./Buttons";

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

    setTimeout(() => {
      const updatedGrid = repairPiece(cell);
      updateActivators(cell.insideCell, updatedGrid);
    }, 200);
  };

  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      <motion.div
        style={{ borderRadius: "0.4rem" }}
        whileTap={!cell.isDestroyed ? buttonVariants.reject : buttonVariants.success}
        transition={{
          duration: currentGameSpeed({ devider: 6000 }),
          ease: "easeInOut",
        }}
        animate={cell.isDestroyed ? "active" : "inactive"}
        variants={variants}
        initial={cell.isDestroyed ? "active" : "inactive"}
      >
        <Button variant="transparent" onClick={handleRepair}>
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
