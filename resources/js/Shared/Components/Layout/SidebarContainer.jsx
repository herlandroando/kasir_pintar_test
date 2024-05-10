import TextLogo from "@/Shared/Components/Typography/TextLogo";
import { LogOut } from "lucide-react";
import SidebarButton from "./SidebarButton";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Drawer, drawer } from "@material-tailwind/react";
import { router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import sidebarData from "@/Shared/Data/sidebar";

export default function SidebarContainer({
    isSidebarDrawerOpen = false,
    handleSidebarDrawerClose = () => {},
}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const [isOnNavigate, setIsOnNavigate] = useState(false);

    useEffect(() => {
        for (let index = 0; index < sidebarData.length; index++) {
            const url = sidebarData[index].url;
            const onUrl = window.location.pathname.split("/")[1];
            if (index === 0 && onUrl === "") {
                setSelectedIndex(0);
                break;
            }
            if (url.includes(onUrl)) {
                setSelectedIndex(index);
                break;
            }
        }
    }, [isOnNavigate]);

    useEffect(() => {
        setIsSidebarHovered(isSidebarDrawerOpen);
    }, [isSidebarDrawerOpen]);

    function handleOnNavigate(value = false) {
        setIsOnNavigate(value);
    }

    return (
        <React.Fragment>
            <div
                className={
                    classNames({
                        "w-24 ": !isSidebarHovered,
                        "lg:w-2/6 md:w-3/6 w-full": isSidebarHovered,
                    }) +
                    " md:flex hidden flex-col items-center transition-all duration-500"
                }
                onMouseEnter={() => setIsSidebarHovered(true)}
                onMouseLeave={() => setIsSidebarHovered(false)}
            >
                <Sidebar
                    sidebarItems={sidebarData}
                    selectedIndex={selectedIndex}
                    isSidebarHovered={isSidebarHovered}
                    isOnNavigate={isOnNavigate}
                    handleOnNavigate={handleOnNavigate}
                />
            </div>
            <Drawer
                open={isSidebarDrawerOpen}
                onClose={handleSidebarDrawerClose}
                className="md:hidden block z-[8999]"
                overlayProps={{ className: "z-[8995]" }}
            >
                <div className=" flex flex-col items-center justify-between transition-all duration-500 h-full py-7">
                    <Sidebar
                        sidebarItems={sidebarData}
                        selectedIndex={selectedIndex}
                        isSidebarHovered={isSidebarHovered}
                        isOnNavigate={isOnNavigate}
                        handleOnNavigate={handleOnNavigate}
                    />
                </div>
            </Drawer>
        </React.Fragment>
    );
}

function Sidebar({
    sidebarItems = [],
    selectedIndex = 0,
    isSidebarHovered = false,
    isOnNavigate = false,
    handleOnNavigate = () => {},
}) {
    const { user } = usePage().props;
    const defaultHandlerOnNavigate = {
        onStart: () => {
            handleOnNavigate(true);
        },
        onFinish: () => {
            handleOnNavigate(false);
        },
    };

    function handleLogout() {
        router.post(
            "/logout",
            {},
            {
                ...defaultHandlerOnNavigate,
                onSuccess: () => {
                    toast.success("Logout Successfully!");
                },
                onError: () => {
                    toast.error("Something wrong on server. Please wait...");
                },
            }
        );
    }

    function handleNavigate(url) {
        router.get(
            url,
            {},
            {
                preserveState: true,
                ...defaultHandlerOnNavigate,
            }
        );
    }

    return (
        <React.Fragment>
            <div className="my-4 text-center md:mb-2">
                <TextLogo></TextLogo>
            </div>
            <div className="mb-3 w-full px-5">
                <hr className="w-full"></hr>
            </div>
            <div className="flex flex-col w-full h-full p-5 justify-between">
                <div className="flex flex-col gap-3 w-full h-full">
                    {sidebarItems.map(({ Icon, ...item }, index) => {
                        {/* console.log(item.role.includes(user.role), user.role); */}
                        if (item.role.length > 0 && !item.role.includes(user.role) ) {
                            return;
                        }
                        return (
                            <SidebarButton
                                onClick={() => handleNavigate(item.url)}
                                key={item.name}
                                label={item.label}
                                isActive={selectedIndex === index}
                                disabled={isOnNavigate}
                                labelVisible={isSidebarHovered}
                                icon={(isActive) => (
                                    <Icon
                                        className="inline-block ml-1"
                                        absoluteStrokeWidth
                                        size={24}
                                    ></Icon>
                                )}
                            ></SidebarButton>
                        );
                    })}
                </div>
                <div className="w-full flex flex-col">
                    <SidebarButton
                        onClick={handleLogout}
                        label="Logout"
                        labelVisible={isSidebarHovered}
                        disabled={isOnNavigate}
                        icon={(isActive) => (
                            <LogOut
                                className="inline-block ml-1"
                                absoluteStrokeWidth
                                size={24}
                            ></LogOut>
                        )}
                    ></SidebarButton>
                </div>
            </div>
        </React.Fragment>
    );
}
