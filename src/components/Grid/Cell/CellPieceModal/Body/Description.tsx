import React from "react";
import { Modal } from "react-bootstrap";
import Activators from "src/components/Activators/Activators";
import { useCell } from "src/contexts/CellContext";

type DescriptionPropsType = {
  show: boolean;
};

const Description: React.FC<DescriptionPropsType> = ({ show }) => {
  const { cell } = useCell();
  return (
    <Modal.Body>
      <div className="piece-description">{cell.insideCell.description}</div>
      <Activators
        activators={cell.insideCell.activators}
        level={Math.min(cell.insideCell.level + 1, cell.insideCell.upgradeCost.length)}
        destroyChance={cell.insideCell.destroyChance}
        show={show}
        showNextLevel={true}
      />
    </Modal.Body>
  );
};

export default Description;
