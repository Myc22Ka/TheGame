import React from "react";
import { Modal } from "react-bootstrap";
import Activators from "src/components/Activators/Activators";
import { GridEntry } from "src/modules/Grid/types";

type DescriptionPropsType = {
  show: boolean;
  cell: GridEntry;
};

const Description: React.FC<DescriptionPropsType> = ({ show, cell }) => {
  return (
    <Modal.Body>
      <div className="piece-description">{cell.insideCell.description}</div>
      <Activators
        activators={cell.insideCell.activators}
        level={Math.min(cell.insideCell.level + 1, cell.insideCell.upgradeCost.length)}
        show={show}
        showNextLevel={true}
      />
    </Modal.Body>
  );
};

export default Description;
