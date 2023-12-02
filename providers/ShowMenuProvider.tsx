"use client";

import { Props } from "@/hooks/useUser";
import { createContext, useState } from "react";

interface ShowMenuProviderProps {
    children: React.ReactNode;
}

export const SidebarContext = createContext<Props>({});
const ShowMenuContextProvider = (props: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    return <SidebarContext.Provider value={{ showMenu, setShowMenu }} {...props} />;
};

const ShowMenuProvider: React.FC<ShowMenuProviderProps> = ({ children }) => {
    return <ShowMenuContextProvider>{children}</ShowMenuContextProvider>;
};
export default ShowMenuProvider;
