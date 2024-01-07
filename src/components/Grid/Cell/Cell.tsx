import React, { useState } from "react";
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
import PieceConfig from "./PieceConfig";

type CellProps = {
  cell: GridEntry;
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { score } = useScore();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Stack
      className="cell justify-content-center align-items-center"
      style={{ borderColor: styles[cell.insideCell.rule] }}
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
        onClick={handleShow}
      >
        {cell.insideCell.rule ? (
          <FontAwesomeIcon
            icon={
              piecesIcons.find((e) => e.rule === cell.insideCell.rule)!.icon
            }
            size="3x"
          />
        ) : null}
      </motion.div>
      <PieceConfig show={show} handleClose={handleClose} />
    </Stack>
  );
};

export default Cell;
