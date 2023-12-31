"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useUser from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast/headless";
import usePlayer from "@/hooks/usePlayer";
import { useContext } from "react";
import { SidebarContext } from "@/providers/ShowMenuProvider";
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const player = usePlayer();
    const supabaseClient = useSupabaseClient();
    const { showMenu, setShowMenu } = useContext(SidebarContext);
    const { user } = useUser();
    const handleLogout = async () => {
        // logout
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged out!");
        }
    };
    const authModal = useAuthModal();
    return (
        <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex items-center gap-x-2">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft size={35} className="text-white" />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight size={35} className="text-white" />
                    </button>
                </div>
                <div
                    className={twMerge(
                        "flex md:hidden gap-x-2 items-center",
                        showMenu ? "hidden" : "block"
                    )}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <GiHamburgerMenu className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            <Button onClick={() => router.push("/account")} className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={() => authModal.onOpen(true)}
                                    className="bg-transparent text-neutral-300 font-medium">
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => authModal.onOpen(false)}
                                    className="bg-white px-6 py-2">
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
