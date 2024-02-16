import React, { useRef } from "react";
import { GameStats } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import options from "src/config.json";
import { ActivatorsType } from "src/modules/Score/types";
import Box from "./Box";

type ActivatorsScalesPropsType = {
  activators: ActivatorsType;
  show: boolean;
  level: number;
};

const calcLength = (activator: GameStats, value: number, delay: React.MutableRefObject<number>) => {
  const foundPiece = options.pieces.types.find((e) => e.rule === activator);
  const closest = foundPiece
    ? foundPiece.range.reduce((prev, curr) =>
        Math.abs(curr - Math.abs(value)) < Math.abs(prev - Math.abs(value)) ? curr : prev
      )
    : undefined;
  const result = foundPiece ? foundPiece.range.findIndex((e) => e === closest) + 1 : 0;
  delay.current = result;

  return result;
};

const ActivatorsScales: React.FC<ActivatorsScalesPropsType> = ({ activators, show, level }) => {
  const delay = useRef(-1);

  return (
    <Stack direction="vertical" style={{ padding: 3, gap: "3px", flex: 0 }}>
      {Object.entries(activators).map(([activator, value]) => {
        const length = calcLength(activator as GameStats, value[level], delay);

        return (
          <Stack
            key={`${activator}-${level}`}
            direction="horizontal"
            gap={1}
            className="justify-content-end align-items-center"
          >
            {Array.from(Array(length).keys()).map((_, i) => (
              <Box
                key={`${i}-${level}`}
                i={i}
                value={value[level]}
                activator={activator as GameStats}
                delay={delay}
                show={show}
              />
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ActivatorsScales;
