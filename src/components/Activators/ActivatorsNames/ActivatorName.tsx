import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { GameStats } from "src/modules/Game/types";
import { statsIcons } from "src/modules/Piece/statsIcons";
import { changeCammelCaseToSpace } from "src/utils/changeToCamelCase";
import styles from "src/styles/style.module.scss";

type ActivatorNamePropsType = {
  activator: GameStats;
};

const ActivatorName: React.FC<ActivatorNamePropsType> = ({ activator }) => {
  return (
    <Stack direction="horizontal" gap={1}>
      <FontAwesomeIcon icon={statsIcons[activator]} size="lg" color={styles.main} width={20} />
      <div className="activator">{changeCammelCaseToSpace(activator)}</div>
    </Stack>
  );
};

export default ActivatorName;
