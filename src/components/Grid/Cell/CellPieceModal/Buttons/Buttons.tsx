import React from "react";
import { Modal, Stack } from "react-bootstrap";
import RepairButton from "./RepairButton";
import LevelUpButton from "./LevelUpButton";

type ButtonsPropsType = {
  handleClose: () => void;
};

const Buttons: React.FC<ButtonsPropsType> = ({ handleClose }) => {
  return (
    <>
      <hr className="hr" />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Stack className="justify-content-between" direction="horizontal">
          <RepairButton handleClose={handleClose} />
          <LevelUpButton handleClose={handleClose} />
        </Stack>
      </Modal.Body>
    </>
  );
};

export default Buttons;
