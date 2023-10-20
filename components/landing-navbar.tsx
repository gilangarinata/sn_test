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
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import React from "react";

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
        href : "/who-we-are"
    },
    {
        label : "OUR BUSINESS",
        href : "/our-business"
    },
    {
        label : "ZERO CAPEX",
        href : "/zero-capex"
    },
    {
        label : "MEDIA",
        isDropDown: true,
        href : "/media"
    },
    {
        label : "CAREER",
        href : "/career"
    },
    {
        label : "GET IN TOUCH",
        href : "/get-in-touch"
    },
    {
        label : "Language",
        href : "/"
    },
]

export const LandingNavBar = () => {

    return (
        <nav className="bg-white flex items-center sticky top-0 z-50 px-6 py-4">
            <Link href="/" className="flex items-center">
                <Image sizes="100vw"
                       width={0}
                       height={0}
                       style={{ width: '200px', height: 'auto' }} src="/images/logo_sesna.png" alt="logo" />
            </Link>
            <div className="block lg:hidden mr-4">
                <Sheet>
                  <SheetTrigger>
                      <Menu />
                  </SheetTrigger>
                    <SheetContent side="right" className="p-0">
                        <div className="flex flex-col px-4 gap-4 py-20">
                            <NavContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden lg:flex items-center justify-end gap-x-8 w-full">
                <NavContent />
            </div>
        </nav>
    )
}


export default function NavContent() {
    const pathName = usePathname();

    return routes.map(route =>
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
            ) : route.isDropDown == true ?
                (
                    <DropdownMenu key={route.label}>
                        <DropdownMenuTrigger>
                            <div className="flex">
                                <p className={cn("font-semibold", pathName == route.href ? "text-[#FAC225]" : "text-[#15527B]/80")}>{route.label}</p>
                                <ChevronDown className={cn("hidden",route.isDropDown == true ? "block" : "hidden")} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="hover:cursor-pointer">
                            <DropdownMenuItem><Link className="w-full" href="/media/news">News</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link className="w-full" href="/media/video">Video</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                ) : (
                    <Link href={route.href} key={route.label} >
                        <p className={cn("font-semibold", pathName == route.href ? "text-[#FAC225]" : "text-[#15527B]/80")}>{route.label}</p>
                    </Link>
                )
    )
}

