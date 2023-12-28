import React from "react";
import { useScore } from "../../../contexts/ScoreContext";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../styles/style.module.scss";
import { statsIcons } from "../../../modules/Piece/utils";

const StatsDisplay: React.FC = () => {
  const { score } = useScore();

  const changeCammelCaseToSpace = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <Stack
      direction="vertical"
      gap={1}
      className="stats-display p-2"
      style={{ flex: 0 }}
    >
      <Stack
        className="stats-btn justify-content-start p-1"
        gap={2}
        direction="horizontal"
      >
        <FontAwesomeIcon icon={faSquarePollVertical} />
        <div>Stats Display</div>
      </Stack>
      <Container>
        {Object.entries(score.gameStats).map(([key, value], index) => {
          return (
            <Row key={key}>
              <Col style={{ flex: 0, padding: 0, paddingLeft: "1rem" }}>
                <FontAwesomeIcon
                  icon={statsIcons[index].icon}
                  size="lg"
                  color={styles.main}
                />
              </Col>
              <Col style={{ flex: 1 }}>
                <div style={{ fontSize: "small" }}>
                  {changeCammelCaseToSpace(key)}
                </div>
              </Col>
              <Col style={{ flex: 0 }}>
                <div>{`${parseFloat(value.toFixed(1))}${
                  [4, 5, 6, 7].includes(index) ? "%" : ""
                }`}</div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </Stack>
  );
};

export default StatsDisplay;
