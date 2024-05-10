import { Link } from "@inertiajs/react";
import SidebarContainer from "@/Shared/Components/Layout/SidebarContainer";
import Title from "../Shared/Components/Typography/Title";
import { Button, IconButton } from "@material-tailwind/react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function DefaultLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function handleSidebarDrawer() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function handleSidebarDrawerClose() {
        setIsSidebarOpen(false);
    }

    return (
        <main className="relative h-screen w-screen">
            <div className="bg-gray-300 w-full h-full">
                <div className="flex flex-row w-full h-full md:py-6 md:pr-6">
                    <SidebarContainer
                        isSidebarDrawerOpen={isSidebarOpen}
                        handleSidebarDrawerClose={handleSidebarDrawerClose}
                    ></SidebarContainer>
                    <div className="relative bg-gray-50 rounded-lg w-full shadow-md md:max-h-[calc(100vh - 3rem)] max-h-none overflow-auto">
                        <header className="flex flex-row justify justify-between mb-2 sticky top-0 py-4 px-5 bg-gray-50">
                            <div className="flex flex-row items-center gap-2">
                                <IconButton
                                    variant="text"
                                    className="px-3 md:hidden block"
                                    onClick={handleSidebarDrawer}
                                >
                                    {isSidebarOpen ? (
                                        <PanelRightOpen
                                            absoluteStrokeWidth
                                        ></PanelRightOpen>
                                    ) : (
                                        <PanelRightClose absoluteStrokeWidth />
                                    )}
                                </IconButton>
                                <div id="titlePage"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 border-b-2 border-solid border-gray-100 w-full"></div>
                        </header>
                        <div className="md:px-5 p-4">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
