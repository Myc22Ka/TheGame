import React, { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/shop.scss";

const MAX_GRID_SIZE: number = 5;

type Component = {
  name: string;
};

const defaultComponent = {
  name: "",
};

const ARRAY_OF_COMPONENTS: Array<Component> = [
  { name: "Component1" },
  { name: "Component2" },
];

const Shop: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const [randomComponent, setRandomComponent] =
    useState<Component>(defaultComponent);

  const handleClick = () => {
    if (Math.sqrt(game.grid.length) < MAX_GRID_SIZE && game.score > 1) {
      let start = game.grid.length;
      game.grid.length = Math.pow(Math.sqrt(game.grid.length) + 1, 2);
      resizeGrid(game.grid.fill({ name: "" }, start));
    }
  };

  const generateComponent = () => {
    // xd because I want to make something truly random
    const jsonString = JSON.stringify(ARRAY_OF_COMPONENTS);
    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(jsonString).buffer;
    const uint8Array = new Uint8Array(arrayBuffer);

    const randomIndex =
      self.crypto.getRandomValues(uint8Array)[0] % ARRAY_OF_COMPONENTS.length;

    return ARRAY_OF_COMPONENTS[randomIndex];
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      setRandomComponent(generateComponent());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="shop">
      <div className="random-component-gen">
        <div className={randomComponent.name}>{randomComponent.name}</div>
      </div>
      <button onClick={handleClick}>Resize Grid</button>
    </div>
  );
};

export default Shop;
