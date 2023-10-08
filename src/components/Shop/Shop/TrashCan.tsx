import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTrashcan } from "../../../contexts/TrashcanContext";

const TrashCan: React.FC = () => {
  const trashRef = useRef<HTMLDivElement>(null);
  const { setTrashcanRef, trashcan, setActiveTrashcan } = useTrashcan();

  useEffect(() => {
    setTrashcanRef(trashRef);
  }, []);

  useEffect(() => {
    console.log(trashcan);
  }, [trashcan]);

  const handleMouseEnter = () => {
    if (trashcan.drag) setActiveTrashcan("fade");
  };

  return (
    <motion.div
      className="trashcan p-4"
      ref={trashRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() =>
        trashcan.animate !== "none" ? setActiveTrashcan("none") : null
      }
    >
      <FontAwesomeIcon
        icon={faTrashCan}
        bounce={trashcan.animate === "bounce"}
        fade={trashcan.animate === "fade"}
        size="3x"
      />
    </motion.div>
  );
};

export default TrashCan;
