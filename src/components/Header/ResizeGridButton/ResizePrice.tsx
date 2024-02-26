import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";

type ResizePricePropsType = {
  price: number;
};

const ResizePrice: React.FC<ResizePricePropsType> = ({ price }) => {
  const { score } = useScore();

  return (
    <Stack direction="horizontal" gap={1} className="px-2">
      <b>{price}</b>
      <FontAwesomeIcon icon={faCoins} color={price > score.gold ? "white" : styles.main} />
    </Stack>
  );
};

export default ResizePrice;
