import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { pieceTransition, piecesIcons } from "../../modules/Piece/utils";
import { GridEntry } from "../../modules/Piece/types";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CellProps {
  cell: GridEntry;
}

const variants = {
  active: {
    scale: 1,
  },
  inactive: {
    scale: 0,
  },
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  return (
    <Stack className="cell justify-content-center align-items-center">
      <motion.div
        className={`piece ${cell.insideCell.rule}`}
        initial="inactive"
        variants={variants}
        transition={pieceTransition}
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
