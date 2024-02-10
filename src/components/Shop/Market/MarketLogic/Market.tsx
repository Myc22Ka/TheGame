import React from "react";
import { Stack } from "react-bootstrap";
import Grid from "./Grid";
import { useMarket } from "src/contexts/MarketContext";

const Market: React.FC = () => {
  const { marketContent } = useMarket();

  return (
    <Stack direction="vertical" style={{ flex: 0 }}>
      <div className="p-3 devider"></div>
      {marketContent.activeState === "Market" ? <Grid /> : <div>Hi</div>}
      <div className="p-3 devider"></div>
    </Stack>
  );
};

export default Market;
