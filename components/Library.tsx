"use client";
import React, { useContext } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { SidebarContext } from "@/providers/ShowMenuProvider";

interface LibraryProps {
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);
    const { setShowMenu } = useContext(SidebarContext);
    const onClick = () => {
        setShowMenu(false);
        if (!user) {
            return authModal.onOpen(false);
        }
        if (!subscription) {
            return subscribeModal.onOpen();
        }
        return uploadModal.onOpen();
        // handle upload
    };
    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist size={26} className="text-neutral-400" />
                    <p className="text-neutral-400 font-medium text-base">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <div key={item.id}>
                        <MediaItem data={item} onClick={(id: string) => onPlay(id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
