interface SidebarItemProps {
    icon: IconType;
    label: String;
    active?: boolean;
    href: string;
}

import { SidebarContext } from "@/providers/ShowMenuProvider";
import Link from "next/link";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href }) => {
    const { setShowMenu } = useContext(SidebarContext);
    return (
        <Link
            href={href}
            onClick={() => {
                setTimeout(() => {
                    setShowMenu(false);
                }, 300);
            }}
            className={twMerge(
                "flex flex-row h-auto items-center w-full gap-x-4 text-base font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
                active && "text-white"
            )}>
            <Icon size={26} />
            <p className="truncate w-full">{label}</p>
        </Link>
    );
};

export default SidebarItem;
