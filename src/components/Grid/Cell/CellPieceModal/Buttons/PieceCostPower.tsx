import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";

type PieceCostPowerProps = {
  disabled: boolean;
};

const PieceCostPower: React.FC<PieceCostPowerProps> = ({ disabled }) => {
  const { score } = useScore();
  const { cell } = useCell();
  const { level, activators } = cell.insideCell;

  return (
    <Stack direction="horizontal" gap={1} className="px-2">
      <b>{Math.abs((activators?.power || [])[level - 1])}</b>
      <FontAwesomeIcon icon={faBolt} color={disabled ? styles.background : styles.main} />
    </Stack>
  );
};

export default PieceCostPower;
