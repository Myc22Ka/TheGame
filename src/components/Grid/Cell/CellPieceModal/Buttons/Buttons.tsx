import React from "react";
import { Modal, Stack } from "react-bootstrap";
import RepairButton from "./RepairButton";
import LevelUpButton from "./LevelUpButton";
import { GridEntry } from "src/modules/Grid/types";

type ButtonsPropsType = {
  cell: GridEntry;
  handleClose: () => void;
};

const Buttons: React.FC<ButtonsPropsType> = ({ cell, handleClose }) => {
  return (
    <>
      <hr className="hr" />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Stack className="justify-content-between" direction="horizontal">
          <RepairButton handleClose={handleClose} cell={cell} />
          <LevelUpButton handleClose={handleClose} cell={cell} />
        </Stack>
      </Modal.Body>
    </>
  );
};

export default Buttons;
