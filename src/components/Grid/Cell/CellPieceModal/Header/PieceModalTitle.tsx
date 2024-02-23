import React from "react";
import { Modal, Stack } from "react-bootstrap";
import Levels from "../../InsideCell/Levels/Levels";
import Title from "src/components/Animations/Text/Title";
import Piece from "src/components/Piece/Piece";
import { useCell } from "src/contexts/CellContext";

const PieceModalTitle: React.FC = () => {
  const { cell } = useCell();
  return (
    <>
      <Modal.Header className="justify-content-center align-items-center" style={{ borderBottom: "none" }}>
        <Stack direction="vertical" className="justify-content-center align-items-center">
          <Title title={cell.insideCell.name} />
          <Piece />
          <Levels />
        </Stack>
      </Modal.Header>
      <hr className="hr" />
    </>
  );
};

export default PieceModalTitle;
