import React, { useRef, useEffect } from "react";
import { useGame } from "../contexts/GameContext";

const TrashCan: React.FC = () => {
  const trashRef = useRef<HTMLDivElement>(null);
  const { setTrashCan } = useGame();

  useEffect(() => {
    setTrashCan(trashRef);
  }, []);

  return (
    <div className="trashcan" ref={trashRef}>
      Trash
    </div>
  );
};

export default TrashCan;
