import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";

type ResizePricePropsType = {
  price: number;
};

const ResizePrice: React.FC<ResizePricePropsType> = ({ price }) => {
  return (
    <Stack direction="horizontal" gap={1} className="px-2">
      <b>{price}</b>
      <FontAwesomeIcon icon={faCoins} />
    </Stack>
  );
};

export default ResizePrice;
