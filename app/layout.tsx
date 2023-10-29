import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserdId from "@/actions/getSongsByUserId";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Musify",
    description: "Listen to music",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const userSongs = await getSongsByUserdId();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
