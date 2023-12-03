"use client";
import Header from "@/components/Header";
import React from "react";
import AccountContent from "./components/AccountContent";
import { FaUserAlt } from "react-icons/fa";
import useUser from "@/hooks/useUser";
import { twMerge } from "tailwind-merge";

const Account = () => {
    const { user } = useUser();
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Account settings</h1>
                </div>
                <div className="flex items-center flex-col pt-4">
                    <div className="border-8 rounded-full border-gray-400 overflow-hidden bg-neutral-500 flex justify-center items-center p-5 w-36 h-36 md:w-52 md:h-52">
                        <FaUserAlt className="w-36 h-36 md:w-52 md:h-52" />
                    </div>
                    <div
                        className={twMerge(
                            "py-5 md:text-xl",
                            user == null ? "text-transparent" : "font-bold"
                        )}>
                        <span>Email: </span>
                        <span>{user?.email ?? "No email found"}</span>
                    </div>
                </div>
            </Header>
            <div className="flex justify-center">
                <AccountContent />
            </div>
        </div>
    );
};

export default Account;
