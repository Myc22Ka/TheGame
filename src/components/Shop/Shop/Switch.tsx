import {
  IconDefinition,
  faBagShopping,
  faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { Stack } from "react-bootstrap";
import { activeStateType } from "./Market";

type SwitchState = {
  activeState: activeStateType;
  changeActiveState: (stateState: activeStateType) => void;
};

const Switch: React.FC<SwitchState> = ({ activeState, changeActiveState }) => {
  const buttons: { name: activeStateType; icon: IconDefinition }[] = [
    { name: "Shop", icon: faBagShopping },
    {
      name: "Upgrades",
      icon: faCircleUp,
    },
  ];

  const isActive = useCallback(
    (i: number) => {
      return (
        (activeState === "Shop" && i === 0) ||
        (activeState === "Upgrades" && i === 1)
      );
    },
    [activeState]
  );

  return (
    <Stack direction="horizontal" className="justify-content-center">
      {buttons.map((e, i) => {
        return (
          <Stack
            key={i}
            gap={isActive(i) ? 2 : 0}
            direction="horizontal"
            className={`p-2 px-5 justify-content-center align-items-center shop-button ${
              isActive(i) ? `${e.name.toLowerCase()} active` : ""
            }`}
            onClick={() => changeActiveState(e.name)}
          >
            <FontAwesomeIcon icon={e.icon} size="lg" />
            <div className="h6 m-0">{isActive(i) ? e.name : null}</div>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Switch;
