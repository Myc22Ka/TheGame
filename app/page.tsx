"use client";

import React from "react";
import "../globals.css";
import { useThemeContext } from "./Context/ThemeContext";

function Homepage() {
    const theme = useThemeContext();

    return <div className="">{theme.color}</div>;
}

export default Homepage;
