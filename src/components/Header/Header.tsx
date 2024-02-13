import React from "react";
import Score from "./Score";
import { Stack } from "react-bootstrap";
import ResizeGridButton from "./ResizeGridButton";
import Timer from "./Timer";
import Power from "./Power";

const Header: React.FC = () => {
  return (
    <Stack
      className="header align-items-center justify-content-between px-3 py-1 user-select-none"
      direction="horizontal"
      gap={3}
    >
      <Stack direction="horizontal" gap={3}>
        <Power />
        <Score />
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <ResizeGridButton />
        <Timer />
      </Stack>
    </Stack>
  );
};

export default Header;
