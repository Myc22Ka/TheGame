import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useCallback,
} from "react";

export type TrashcanType = {
  ref: React.RefObject<HTMLDivElement> | null;
  animate: "fade" | "bounce" | "none";
  amount: number;
  drag: boolean;
};

export const initTrashcanState: TrashcanType = {
  ref: null,
  animate: "none",
  amount: 0,
  drag: false,
};

const useTrashcanContext = (defaultTrashcanState: TrashcanType) => {
  const [trashcan, setTrashcan] = useState(defaultTrashcanState);

  const setTrashcanRef = useCallback(
    (trashCanRef: React.RefObject<HTMLDivElement>) => {
      setTrashcan((prev) => ({ ...prev, ref: trashCanRef }));
    },
    []
  );

  const setActiveTrashcan = useCallback(
    (newActiveState: "fade" | "bounce" | "none") => {
      let amount = trashcan.amount;
      if (newActiveState === "bounce") amount = trashcan.amount + 1;

      setTrashcan((prev) => ({
        ...prev,
        animate: newActiveState,
        amount: amount,
      }));
    },
    [trashcan]
  );

  const setDragState = useCallback((newDragState: boolean) => {
    setTrashcan((prev) => ({ ...prev, drag: newDragState }));
  }, []);

  const setInitialTrashcanState = useCallback(
    () => setTrashcan((prev) => ({ ...prev, animate: "none", drag: false })),
    []
  );

  return {
    trashcan,
    setTrashcanRef,
    setActiveTrashcan,
    setDragState,
    setInitialTrashcanState,
  };
};

const initContextState: ReturnType<typeof useTrashcanContext> = {
  trashcan: initTrashcanState,
  setTrashcanRef: () => {},
  setActiveTrashcan: () => {},
  setDragState: () => {},
  setInitialTrashcanState: () => {},
};

export const TrashcanContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactElement | null;
};

export const TrashcanProvider = ({
  children,
  ...initState
}: ChildrenType & TrashcanType) => {
  return (
    <TrashcanContext.Provider value={useTrashcanContext(initState)}>
      {children}
    </TrashcanContext.Provider>
  );
};

export const useTrashcan = () => {
  const {
    trashcan,
    setActiveTrashcan,
    setTrashcanRef,
    setDragState,
    setInitialTrashcanState,
  } = useContext(TrashcanContext);

  return {
    trashcan,
    setActiveTrashcan,
    setTrashcanRef,
    setDragState,
    setInitialTrashcanState,
  };
};
