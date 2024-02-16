import React, { useEffect, useState } from "react";
import { GridEntry } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import PieceConfig from "./CellPieceModal/PieceConfig";
import Levels from "./Levels";
import Piece from "./Piece";
import PieceStatus from "./PieceStatus";
import { useCell } from "src/contexts/CellContext";

type CellProps = {
  cell: GridEntry;
};

const Cell: React.FC<CellProps> = ({ cell }) => {
  const [show, setShow] = useState(false);
  const { updateCell } = useCell();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    updateCell(cell);
  }, [cell.isEmpty, cell.isDestroyed]);

  return (
    <Stack
      className="cell justify-content-center align-items-center"
      style={{ borderColor: styles[cell.insideCell.rule] }}
    >
      <PieceStatus cell={cell} />
      <Piece handleShow={handleShow} cell={cell} />
      <Levels cell={cell} />
      <PieceConfig show={show} handleClose={handleClose} cell={cell} />
    </Stack>
  );
};

export default Cell;
