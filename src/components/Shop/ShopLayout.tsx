import React from "react";
import { Stack } from "react-bootstrap";
import "src/styles/shop.scss";
import RandomPieceGen from "./Piece/RandomPieceGen";
import Market from "./Market/MarketLogic/Market";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarBattery } from "@fortawesome/free-solid-svg-icons";
import { MarketProvider, initMarketState } from "src/contexts/MarketContext";

const ShopLayout: React.FC = () => {
  return (
    <Stack direction="vertical" className="shop justify-content-between h-100">
      <Stack
        className="devider justify-content-center align-items-center"
        style={{ flex: 0, position: "relative" }}
      >
        <div className="generator">
          <FontAwesomeIcon icon={faCarBattery} size="2x" color="white" />
        </div>
      </Stack>
      <MarketProvider {...initMarketState}>
        <React.Fragment>
          <RandomPieceGen />
          <Market />
        </React.Fragment>
      </MarketProvider>
    </Stack>
  );
};

export default ShopLayout;
