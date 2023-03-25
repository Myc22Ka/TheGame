import React from "react";
import MainMenu from "./Layout/MainMenu";
import { ThemeProvider } from "./Context/ThemeContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body className="bg-slate-500 m-4 ">
                <ThemeProvider>
                    <div className="flex flex-row justify-center items-center ">
                        <MainMenu />
                        {/* picture  */}
                        <div className="flex-1"></div>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
