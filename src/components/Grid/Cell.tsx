import React from "react";
import { motion } from "framer-motion";
import { piecesIcons } from "../../modules/Piece/utils";
import { GridEntry } from "../../modules/Piece/types";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gridVariants } from "../../modules/Grid/utils";
import { getPieceTransition } from "../../modules/game_utils";
import { useScore } from "../../contexts/ScoreContext";
import styles from "../../styles/style.module.scss";

type CellProps = {
  cell: GridEntry;
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { score } = useScore();
  return (
    <Stack
      className="cell justify-content-center align-items-center"
      style={{ borderColor: styles[cell.insideCell.rule] }}
    >
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
