"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {ChevronDown, Globe, Menu} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SignOutButton} from "@clerk/nextjs";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label : "HOME",
        href : "/"
    },
    {
        label : "WHO WE ARE",
        href : "/conversation"
    },
    {
        label : "OUR BUSINESS",
        href : "/images"
    },
    {
        label : "ZERO CAPEX",
        href : "/video"
    },
    {
        label : "MEDIA",
        isDropDown: true,
        href : "/music"
    },
    {
        label : "CAREER",
        href : "/code"
    },
    {
        label : "GET IN TOUCH",
        href : "/setting"
    },
    {
        label : "Language",
        href : "/"
    },
]

export const LandingNavBar = () => {
    const pathName = usePathname();

    return (
        <nav className="bg-white flex items-center justify-between sticky top-0 z-50 px-6 py-4">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-32 mr-6">
                    <Image fill src="/images/logo_sesna.png" alt="logo" />
                </div>
            </Link>
            <div className="block lg:hidden mr-4">
                <Menu />
            </div>
            <div className="hidden lg:flex items-center gap-x-8 ">
                {routes.map(route =>
                    route.label === "Language" ?
                        (
                            <DropdownMenu key={route.label}>
                                <DropdownMenuTrigger>
                                    <div className="rounded-sm border border-slate-500">
                                        <div className="flex items-center px-2 py-1 gap-1">
                                            <Globe width={15} />
                                            <p className="text-sm">English</p>
                                            <ChevronDown width={15} />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem>English</DropdownMenuItem>
                                    <DropdownMenuItem>Indonesia</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/" key={route.label} >
                                <p className={cn("font-semibold", pathName == route.href ? "text-[#FAC225]" : "text-[#15527B]/80")}>{route.label}</p>
                            </Link>
                        )
                )}
            </div>
        </nav>
    )
}