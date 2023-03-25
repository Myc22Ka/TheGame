"use client";

import React, { useEffect } from "react";
import { useThemeContext } from "./Context/ThemeContext";

function Homepage() {
    const theme = useThemeContext();

    console.log(theme);

    return <div>page</div>;
}

export default Homepage;
