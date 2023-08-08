"use client";

import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Montserrat} from "next/font/google";
import {Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon} from "lucide-react";
import {usePathname} from "next/navigation";

const montserrat = Montserrat({ weight : "600", subsets : ["latin"]});

const routes = [
    {
        label : "Dashboard",
        icon : LayoutDashboard,
        href : "/dashboard"
    },
    {
        label : "Conversation",
        icon : MessageSquare,
        href : "/conversation"
    },
    {
        label : "Image Generation",
        icon : ImageIcon,
        href : "/image"
    },
    {
        label : "Video Generation",
        icon : VideoIcon,
        href : "/video"
    },
    {
        label : "Music Generation",
        icon : Music,
        href : "/music"
    },
    {
        label : "Code Generation",
        icon : Code,
        href : "/code"
    },
    {
        label : "Setting",
        icon : Settings,
        href : "/setting"
    },
]

const Sidebar = ( {isMobile = false} ) => {
    const pathName = usePathname();

    return (
        <div className="flex h-full">
            <div className="space-y-4 py-4 flex flex-col h-full bg-white">
                <div className="px-6 py-2 flex-1" >
                    <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                        <div className="relative w-8 h-8 mr-4">
                            <Image fill src="/logo.png" alt="Logo" />
                        </div>
                        <h1 className={cn("text-2xl font-bold", montserrat.className)}>MindWave</h1>
                    </Link>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#6E62E5]/10 rounded-lg transition", pathName === route.href ? "text-white bg-[#6E62E5]" : "text-zinc-600")} >
                                <div className="flex items-center flex-1">
                                    <route.icon className="h-5 w5 mr-5"/>
                                    {route.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cn("w-px bg-gray-100", isMobile === true ? "hidden" : "")}></div>
        </div>
    )
}

export default Sidebar;