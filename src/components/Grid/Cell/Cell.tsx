import React, { useState } from "react";
import { motion } from "framer-motion";
import { GridEntry } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import { gridVariants } from "src/modules/Grid/utils";
import { getPieceTransition } from "src/modules/game_utils";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "src/modules/Piece/utils";
import PieceConfig from "./PieceConfig";
import CellHeader from "./CellHeader/CellHeader";

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
      {cell.insideCell.rule && <CellHeader cell={cell} />}
      <motion.div
        className={`piece ${cell.insideCell.rule}`}
        initial="inactive"
        variants={gridVariants}
        transition={getPieceTransition(score)}
        animate={cell.animate}
        onClick={handleShow}
      >
        {cell.insideCell.rule && (
          <FontAwesomeIcon
            icon={
              piecesIcons.find((e) => e.rule === cell.insideCell.rule)!.icon
            }
            size="3x"
          />
        )}
      </motion.div>
      <PieceConfig show={show} handleClose={handleClose} />
    </Stack>
  );
};

export default Cell;
