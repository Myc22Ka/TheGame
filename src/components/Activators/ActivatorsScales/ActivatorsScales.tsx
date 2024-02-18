import React, { useRef } from "react";
import { GameStats } from "src/modules/Piece/types";
import { Stack } from "react-bootstrap";
import options from "src/config.json";
import { ActivatorsType } from "src/modules/Score/types";
import Box from "./Box";

type ActivatorsScalesPropsType = {
  activators: ActivatorsType;
  destroyChance: number[];
  show: boolean;
  level: number;
};

const calcLength = (activator: GameStats | "destroyChance", value: number, delay: React.MutableRefObject<number>) => {
  let closest: number | undefined;

  if (activator === "destroyChance") {
    closest = options.score.destroyRange.reduce((prev, curr) =>
      Math.abs(curr - Math.abs(value)) < Math.abs(prev - Math.abs(value)) ? curr : prev
    );

    const result = options.score.destroyRange.findIndex((e) => e === closest) + 1;
    delay.current = result;
    return result;
  }

  const foundPiece = options.pieces.types.find((e) => e.rule === activator);

  closest = foundPiece
    ? foundPiece.range.reduce((prev, curr) =>
        Math.abs(curr - Math.abs(value)) < Math.abs(prev - Math.abs(value)) ? curr : prev
      )
    : undefined;
  const result = foundPiece ? foundPiece.range.findIndex((e) => e === closest) + 1 : 0;
  delay.current = result;

  return result;
};

const ActivatorsScales: React.FC<ActivatorsScalesPropsType> = ({ destroyChance, activators, show, level }) => {
  const delay = useRef(-1);

  return (
    <Stack direction="vertical" style={{ padding: 3, gap: "3px", flex: 0 }}>
      {Object.entries({ ...activators, destroyChance }).map(([activator, value]) => {
        const length = calcLength(activator as GameStats, value[level], delay);

        if (activator === "power") return;

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
