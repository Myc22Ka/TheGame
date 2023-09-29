import React, { useRef, useEffect, useState } from "react";
import { useGame } from "../../../contexts/GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const TrashCan: React.FC = () => {
  const [isHover, setIsHover] = useState(false);
  const trashRef = useRef<HTMLDivElement>(null);
  const { setTrashCan } = useGame();

  useEffect(() => {
    setTrashCan(trashRef);
  }, []);

  return (
    <motion.div
      className="trashcan p-4"
      ref={trashRef}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <FontAwesomeIcon icon={faTrashCan} bounce={isHover} size="3x" />
    </motion.div>
  );
};

export default TrashCan;
