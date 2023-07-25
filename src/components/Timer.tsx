import React, { useEffect, useState } from "react";

const formatDate = (seconds: number): string => {
  const h = `${Math.floor(seconds / 3600)}`.padStart(2, "0");
  const m = `${Math.floor((seconds % 3600) / 60)}`.padStart(2, "0");
  const s = `${seconds % 60}`.padStart(2, "0");

  return `${h}:${m}:${s}`;
};

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(currentTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return <div>{formatDate(currentTime)}</div>;
};

export default Timer;
