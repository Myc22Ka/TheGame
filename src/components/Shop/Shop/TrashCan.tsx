import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTrashcan } from "../../../contexts/TrashcanContext";
import options from "../../../config.json";

const TrashCan: React.FC = () => {
  const trashRef = useRef<HTMLDivElement>(null);
  const { setTrashcanRef, trashcan, setActiveTrashcan } = useTrashcan();
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setTrashcanRef(trashRef);
  }, []);

  useEffect(() => {
    if (trashcan.animate === "bounce") {
      setIsBouncing(true);

      setTimeout(() => {
        setActiveTrashcan(trashcan.animate);
        setIsBouncing(false);
      }, options.time.trashcanAnimationTime * 1000);
    }
  }, [trashcan.animate]);

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
        bounce={isBouncing}
        fade={trashcan.animate === "fade"}
        style={{ animationDuration: `${options.time.trashcanAnimationTime}s` }}
        size="3x"
      />
    </motion.div>
  );
};

export default TrashCan;
