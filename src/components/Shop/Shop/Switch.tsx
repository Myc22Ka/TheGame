import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Stack } from "react-bootstrap";

type SwitchState = {
  activeState: boolean;
  changeActiveState: (stateState: boolean) => void;
};

const Switch: React.FC<SwitchState> = ({ activeState, changeActiveState }) => {
  const buttons = [
    { name: "Shop", icon: faBagShopping },
    {
      name: "Upgrades",
      icon: faCircleUp,
    },
  ];

  return (
    <Stack direction="horizontal" className="justify-content-center">
      {buttons.map((e, i) => {
        return (
          <Stack
            key={i}
            direction="horizontal"
            className="p-3"
            onClick={() => changeActiveState(e.name === "Shop")}
          >
            <FontAwesomeIcon icon={e.icon} />
            <div className="shop-button">
              {(activeState && i === 0) || (!activeState && i === 1)
                ? e.name
                : null}
            </div>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Switch;
