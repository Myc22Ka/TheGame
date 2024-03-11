import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { changeCammelCaseToSpace } from "src/utils/changeToCamelCase";
import styles from "src/styles/style.module.scss";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useScore } from "src/contexts/ScoreContext";
import { motion } from "framer-motion";
import { GameStatsType } from "src/modules/Score/types";
import { statsIcons } from "src/modules/Piece/statsIcons";
import { GameStats } from "src/modules/Game/rules";

type DisplayValuePropsType = {
  value: number;
  gameStat: GameStats;
};

const DisplayValue: React.FC<DisplayValuePropsType> = ({ value, gameStat }) => {
  const { score, prevScore } = useScore();
  const transformer = (value: number) => {
    if (["speed", "discount", "resistance"].includes(gameStat)) {
      return Math.round(value * 100) + "%";
    }
    return value.toFixed(1);
  };
  const defaultValue = Number(prevScore.gameStats[gameStat as keyof GameStatsType]);

  const count = useMotionValue(defaultValue);
  const rounded = useTransform(count, transformer);
  const roundedColor = useTransform(
    count,
    [defaultValue, (49 * value) / 50, value],
    [styles[gameStat] || styles.main, styles[gameStat] || styles.main, "#ffffff"]
  );

  useEffect(() => {
    const animation = animate(count, value, { duration: 0.5 });

    return animation.stop;
  }, [score]);

  return (
    <Row>
      <Col style={{ flex: 0 }}>
        <FontAwesomeIcon icon={statsIcons[gameStat]} size="lg" color={styles.main} width={20} />
      </Col>
      <Col style={{ flex: 1, padding: 0, fontSize: "small" }}>
        <Stack direction="horizontal" className="justify-content-start align-items-center">
          {changeCammelCaseToSpace(gameStat)}
        </Stack>
      </Col>
      <Col style={{ flex: 0 }}>
        <motion.div style={{ color: roundedColor }}>{rounded}</motion.div>
      </Col>
    </Row>
  );
};

export default DisplayValue;
