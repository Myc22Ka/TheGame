import React from "react";
import { FaWheelchair } from "react-icons/fa";

function MainMenu() {
    return (
        <div className="flex-1 pt-20 flex flex-col items-center">
            <h2 className="text-white">
                <FaWheelchair size={45} /> Main Menu
            </h2>
            <div>Continue</div>
            <div>New Game</div>
            <div>Options</div>
        </div>
    );
}

export default MainMenu;
