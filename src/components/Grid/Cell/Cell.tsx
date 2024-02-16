import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import PieceConfig from "./CellPieceModal/PieceConfig";
import Levels from "./Levels";
import Piece from "./Piece";
import PieceStatus from "./PieceStatus";
import { useCell } from "src/contexts/CellContext";

const Cell: React.FC = () => {
  const { cell } = useCell();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Stack
      className="cell justify-content-center align-items-center"
      style={{ borderColor: styles[cell.insideCell.rule] }}
    >
      <PieceStatus />
      <Piece handleShow={handleShow} />
      <Levels />
      <PieceConfig show={show} handleClose={handleClose} />
    </Stack>
  );
};

export default Cell;
