import React from "react";
import { FaWheelchair } from "react-icons/fa";
import Button from "../Components/Button";

function MainMenu() {
    const buttons = [];

    return (
        <div className="flex-1 pt-20 flex flex-col items-center bg-slate-600">
            <h2 className="text-white flex items-center justify-center">
                <FaWheelchair size={45} />
                <span className="text-5xl mb-4">Main Menu</span>
            </h2>
            {["New Game", "Options", "Credits"].map((e) => (
                <Button key={e} name={e} />
            ))}
        </div>
    );
}

export default MainMenu;
