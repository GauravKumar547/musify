"use client";
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}
import { usePathname } from "next/navigation";
import React, { useContext, useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { SidebarContext } from "@/providers/ShowMenuProvider";
import { GiTireIronCross } from "react-icons/gi";

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    const pathname = usePathname();
    const player = usePlayer();
    const { showMenu, setShowMenu } = useContext(SidebarContext);
    const routes = useMemo(
        () => [
            { label: "Home", icon: HiHome, active: pathname !== "/search", href: "/" },
            { label: "Search", icon: BiSearch, active: pathname === "/search", href: "/search" },
        ],
        [pathname]
    );
    return (
        <div className={twMerge("flex h-full", player.activeId && "h-[calc(100%-80px)]")}>
            <div
                className={twMerge(
                    "max-md:absolute max-md:z-50 max-md:top-0 max-md:left-0 md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2",
                    showMenu ? "" : "max-md:hidden"
                )}>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="rounded-full p-2 bg-transparent absolute right-2.5 top-7 flex items-center justify-center hover:opacity-75 transition">
                    <GiTireIronCross className="text-white" size={20} />
                </button>
                <Box className="max-md:rounded-b-none max-md:pt-2">
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item}></SidebarItem>
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto md:h-full max-md:h-[calc(100%-116px)] max-md:rounded-t-none">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    );
};

export default Sidebar;
