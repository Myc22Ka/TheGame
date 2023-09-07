import React, { useEffect, useRef, useState } from "react";
import { PanInfo, motion } from "framer-motion";
import { useGame } from "../contexts/GameContext";

type Component = {
  name: string;
};

const defaultComponent = {
  name: "",
};

const ARRAY_OF_COMPONENTS: Array<Component> = [
  { name: "component1" },
  { name: "component2" },
];

const DraggableComponent: React.FC = () => {
  const { game } = useGame();
  const ref = useRef<HTMLDivElement>(null);
  const [randomComponent, setRandomComponent] =
    useState<Component>(defaultComponent);

  const generateComponent = () => {
    // xd because I want to make something truly random
    const randomBytes = new Uint8Array(4);
    self.crypto.getRandomValues(randomBytes);
    const seed =
      randomBytes[0] |
      (randomBytes[1] << 8) |
      (randomBytes[2] << 16) |
      (randomBytes[3] << 24);
    const randomIndex = Math.abs(seed) % ARRAY_OF_COMPONENTS.length;

    return ARRAY_OF_COMPONENTS[randomIndex];
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      setRandomComponent(generateComponent());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // const handleDragEnd = (
  //   event: MouseEvent | TouchEvent | PointerEvent,
  //   info: PanInfo
  // ) => {
  //   const cellCords = game.grid.map((cell, index) => {
  //     const offset = cell.ref?.current?.getBoundingClientRect();

  //     if (!offset) return { x: 0, y: 0, index: -1 };

  //     return {
  //       x: offset.width / 2 + offset.x,
  //       y: offset.height / 2 + offset.y,
  //       index: index,
  //     };
  //   });

  //   const closest: { distance: number; index: number } = cellCords
  //     .map((cords) => ({
  //       distance: Math.sqrt(
  //         Math.pow(cords.x - info.point.x, 2) +
  //           Math.pow(cords.y - info.point.y, 2)
  //       ),
  //       index: cords.index,
  //     }))
  //     .sort((a, b) => a.distance - b.distance)[0];

  //   if (ref.current) {
  //     ref.current.style.top = cellCords[closest.index].y + "px";
  //     ref.current.style.left = cellCords[closest.index].x + "px";
  //   }

  //   console.log(ref.current);
  // };

  // offset difference between start point and end point
  // point is the point when drag ends

  return (
    <motion.div
      className={randomComponent.name}
      drag
      // onDragEnd={handleDragEnd}
      ref={ref}
    >
      {randomComponent.name}
    </motion.div>
  );
};

export default DraggableComponent;
