import React from "react";

const Shop: React.FC = () => {
  const handleClick = () => {
    // its not that simple I need ref to gird element in order to change his --size
  };

  return <div onClick={handleClick}>xd</div>;
};

export default Shop;
