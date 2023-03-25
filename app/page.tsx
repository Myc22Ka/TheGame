"use client";

import React from "react";
import "../globals.css";
import { useThemeContext } from "./Context/ThemeContext";

function Homepage() {
    const theme = useThemeContext();

    console.log(theme);

    return <div className="">PAGE</div>;
}

export default Homepage;
