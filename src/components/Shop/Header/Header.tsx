import React from "react";
import Score from "./Score";
import Timer from "./Timer";
import { Stack } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <Stack
      className="header align-items-center justify-content-between px-3 py-1 user-select-none"
      direction="horizontal"
      gap={3}
    >
      <Score />
      <Timer />
    </Stack>
  );
};

export default Header;
