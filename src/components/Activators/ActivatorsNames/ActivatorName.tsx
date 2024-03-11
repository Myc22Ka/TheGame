import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";
import { statsIcons } from "src/modules/Piece/statsIcons";
import { changeCammelCaseToSpace } from "src/utils/changeToCamelCase";
import styles from "src/styles/style.module.scss";
import { GameStats } from "src/modules/Game/rules";

type ActivatorNamePropsType = {
  activator: GameStats | "destroyChance";
};

const ActivatorName: React.FC<ActivatorNamePropsType> = ({ activator }) => {
  if (activator === "power") return;
  return (
    <Stack direction="horizontal" gap={2}>
      <FontAwesomeIcon icon={statsIcons[activator]} size="lg" color={styles.main} width={20} />
      <div className="activator">{changeCammelCaseToSpace(activator)}</div>
    </Stack>
  );
};

export default ActivatorName;
