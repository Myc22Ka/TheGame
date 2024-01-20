import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { statsIcons } from "src/modules/Piece/utils";
import { changeCammelCaseToSpace } from "src/utils/changeToCamelCase";
import styles from "src/styles/style.module.scss";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useScore } from "src/contexts/ScoreContext";
import { GameStats } from "src/modules/Game/types";
import { motion } from "framer-motion";

type DisplayValuePropsType = {
  value: number;
  gameStat: GameStats;
};

const DisplayValue: React.FC<DisplayValuePropsType> = ({ value, gameStat }) => {
  const { prevScore, score } = useScore();

  const transformer = (value: number) => {
    if (["speed", "discount", "resistance"].includes(gameStat)) {
      return Math.round(value * 100) + "%";
    }
    return value.toFixed(1);
  };

  const count = useMotionValue(Number(prevScore.gameStats[gameStat]));
  const rounded = useTransform(count, transformer);

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1,
    });

    return animation.stop;
  }, [score]);

  return (
    <Row>
      <Col style={{ flex: 0, padding: 0, paddingLeft: "1rem" }}>
        <FontAwesomeIcon
          icon={statsIcons.find((e) => e.rule === gameStat)!.icon}
          size="lg"
          color={styles.main}
        />
      </Col>
      <Col style={{ flex: 1 }}>
        <div style={{ fontSize: "small" }}>
          {changeCammelCaseToSpace(gameStat)}
        </div>
      </Col>
      <Col style={{ flex: 0 }}>
        <motion.div>{rounded}</motion.div>
      </Col>
    </Row>
  );
};

export default DisplayValue;
