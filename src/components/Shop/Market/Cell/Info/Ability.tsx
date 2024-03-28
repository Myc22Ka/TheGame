import React from "react";
import { Stack } from "react-bootstrap";

type AbilityPropsType = {
  name: string;
  value: number;
  description: string;
};

const Ability: React.FC<AbilityPropsType> = ({ name, value, description }) => {
  return (
    <>
      <Stack direction="horizontal" className="justify-content-between">
        <div className="activator">{name}</div>
        <div className="activator">{value}</div>
      </Stack>
      <div className="piece-description">{description}</div>
    </>
  );
};

export default Ability;
