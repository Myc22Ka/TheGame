import React from "react";
import { motion } from "framer-motion";
import { GridEntry } from "../../../modules/Piece/types";
import { Stack } from "react-bootstrap";
import { gridVariants } from "../../../modules/Grid/utils";
import { getPieceTransition } from "../../../modules/game_utils";
import { useScore } from "../../../contexts/ScoreContext";
import styles from "../../../styles/style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "../../../modules/Piece/utils";
import Levels from "./Levels";
import { useGame } from "../../../contexts/GameContext";

type CellProps = {
  cell: GridEntry;
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { score } = useScore();
  const { levelUp } = useGame();
  return (
    <Stack
      className="cell justify-content-center align-items-center"
      style={{ borderColor: styles[cell.insideCell.rule] }}
      onClick={() => levelUp(cell)}
    >
      {cell.insideCell.rule ? (
        <motion.div
          initial="inactive"
          variants={gridVariants}
          className="levels"
          transition={getPieceTransition(score)}
          animate={cell.animate}
        >
          <Levels cell={cell} />
        </motion.div>
      ) : null}
      <motion.div
        className={`piece ${cell.insideCell.rule}`}
        initial="inactive"
        variants={gridVariants}
        transition={getPieceTransition(score)}
        animate={cell.animate}
      >
        {cell.insideCell.rule ? (
          <FontAwesomeIcon
            icon={
              piecesIcons.find((e) => e.role === cell.insideCell.rule)!.icon
            }
            size="3x"
          />
        ) : null}
      </motion.div>
    </Stack>
  );
};

export default Cell;
