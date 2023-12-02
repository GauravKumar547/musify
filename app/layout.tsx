export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserdId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import ShowMenuProvider from "@/providers/ShowMenuProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Musify",
    description: "Listen to music",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const userSongs = await getSongsByUserdId();
    const products = await getActiveProductsWithPrices();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <ShowMenuProvider>
                        <UserProvider>
                            <ModalProvider products={products} />
                            <Sidebar songs={userSongs}>{children}</Sidebar>
                            <Player />
                        </UserProvider>
                    </ShowMenuProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
