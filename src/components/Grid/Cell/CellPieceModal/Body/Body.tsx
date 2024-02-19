import React from "react";
import { Modal } from "react-bootstrap";
import Activators from "src/components/Activators/Activators";
import { useCell } from "src/contexts/CellContext";
import Description from "./Description";

type BodyPropsType = {
  show: boolean;
};

const Body: React.FC<BodyPropsType> = ({ show }) => {
  const { cell } = useCell();
  return (
    <Modal.Body>
      <Description />
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

export default Body;
