import React from "react";
import Grid from "./Grid";
import Shop from "./Shop";
import Gambler from "./Gambler";

const Main: React.FC = () => {
  return (
    <div className="main">
      <Gambler />
      <Grid />
      <Shop />
    </div>
  );
};

export default Main;
