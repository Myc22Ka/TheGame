import React from "react";
import Score from "../components/Score";
import Timer from "../components/Timer";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Score />
      <Timer />
    </div>
  );
};

export default Header;
