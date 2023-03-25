"use client";

import React, {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
} from "react";

type Props = {
    children: React.ReactNode;
};

interface ContextProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ContextProps>({
    color: "",
    setColor: () => "",
});

export const ThemeProvider = ({ children }: Props) => {
    const [color, setColor] = useState("");

    return (
        <ThemeContext.Provider value={{ color, setColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
