import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";
import { PieceType } from "../modules/Piece/types";
import options from "../config.json";

export type ActiveStateType = "Market" | "Upgrades";

type MarketContentType = {
  pieces: PieceType[];
  activeState: ActiveStateType;
};

export const initMarketState: MarketContentType = {
  pieces: options.pieces.types,
  activeState: "Market",
};

const useMarketContext = (defaultMarketState: MarketContentType) => {
  const [marketContent, setMarketContent] = useState(defaultMarketState);

  const changeMarketState = useCallback(
    (newPieceState: PieceType) => {
      setMarketContent((prev) => {
        const updatedMarket = [...prev.pieces];
        const index = updatedMarket.findIndex(
          (piece) => piece.id === newPieceState.id
        );

        if (index !== -1) updatedMarket[index] = newPieceState;

        return { ...prev, pieces: updatedMarket };
      });
    },
    [setMarketContent]
  );

  const changeActiveState = useCallback(
    (newActivetate: ActiveStateType) =>
      setMarketContent((prev) => ({ ...prev, activeState: newActivetate })),
    [setMarketContent]
  );

  return { changeActiveState, changeMarketState, marketContent };
};

const initContextState: ReturnType<typeof useMarketContext> = {
  marketContent: initMarketState,
  changeActiveState: () => {},
  changeMarketState: () => {},
};

export const MarketContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const MarketProvider = ({
  children,
  ...initState
}: ChildrenType & MarketContentType) => {
  return (
    <MarketContext.Provider value={useMarketContext(initState)}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const { changeActiveState, changeMarketState, marketContent } =
    useContext(MarketContext);

  return {
    changeActiveState,
    changeMarketState,
    marketContent,
  };
};
