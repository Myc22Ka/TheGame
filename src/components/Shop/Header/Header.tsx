import React from "react";
import Score from "./Score";
import { Stack } from "react-bootstrap";
import ResizeGridButton from "./ResizeGridButton";

const Header: React.FC = () => {
  return (
    <Stack
      className="header align-items-center justify-content-between px-3 py-1 user-select-none"
      direction="horizontal"
      gap={3}
    >
      <Score />
      <ResizeGridButton />
    </Stack>
  );
};

export default Header;
