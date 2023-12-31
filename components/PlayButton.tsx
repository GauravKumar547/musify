import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
    return (
        <button className="transition md:opacity-0 rounded-full flex justify-center items-center bg-green-500 p-2 md:p-4 drop-shadow-md md:translate md:translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            <FaPlay className="text-black" />
        </button>
    );
};

export default PlayButton;
