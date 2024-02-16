import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";

type PieceCostMoneyProps = {
  disabled: boolean;
};

const PieceCostMoney: React.FC<PieceCostMoneyProps> = ({ disabled }) => {
  const { score } = useScore();
  const { cell } = useCell();
  const { upgradeCost, level } = cell.insideCell;

  return (
    <Stack direction="horizontal" gap={1} className="px-2">
      <b>{upgradeCost[level]}</b>
      <FontAwesomeIcon icon={faCoins} color={disabled ? styles.background : styles.main} />
    </Stack>
  );
};

export default PieceCostMoney;
