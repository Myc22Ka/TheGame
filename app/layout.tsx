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
            <body className="bg-slate-100 px-12 h-screen w-screen flex">
                <ThemeProvider>
                    <div className="w-1/3 h-full justify-center flex">
                        <MainMenu />
                    </div>
                    <div className="flex-1">{children}</div>
                </ThemeProvider>
            </body>
        </html>
    );
}
