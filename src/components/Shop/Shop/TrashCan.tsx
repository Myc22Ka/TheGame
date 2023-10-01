import React, { useRef, useEffect } from "react";
import { useGame } from "../../../contexts/GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const TrashCan: React.FC = () => {
  const trashRef = useRef<HTMLDivElement>(null);
  const { setTrashCan, game } = useGame();

  useEffect(() => {
    setTrashCan(trashRef);
  }, []);

  return (
    <motion.div className="trashcan p-4" ref={trashRef}>
      <FontAwesomeIcon
        icon={faTrashCan}
        bounce={game.trashCan.animate === "bounce"}
        fade={game.trashCan.animate === "fade"}
        size="3x"
      />
    </motion.div>
  );
};

export default TrashCan;
