import React, { useState } from "react";
import { motion } from "framer-motion";
import { GridEntry } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import { gridVariants } from "src/modules/Grid/utils";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "src/modules/Piece/utils";
import PieceConfig from "./PieceConfig";
import CellHeader from "./CellHeader/CellHeader";
import options from "src/config.json";

type CellProps = {
  cell: GridEntry;
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { currentGameSpeed } = useScore();
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
        transition={{
          duration: currentGameSpeed({
            defaultTimeTick: options.time.defaultPieceTransition,
            devider: 1000,
          }),
          ease: "anticipate",
        }}
        animate={cell.animate}
        onClick={handleShow}
      >
        {cell.insideCell.rule !== "default" && (
          <FontAwesomeIcon
            icon={
              piecesIcons.find((e) => e.rule === cell.insideCell.rule)!.icon
            }
            size="3x"
          />
        )}
      </motion.div>
      <PieceConfig show={show} handleClose={handleClose} cell={cell} />
    </Stack>
  );
};

export default Cell;
