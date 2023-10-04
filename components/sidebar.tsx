"use client";

import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Montserrat} from "next/font/google";
// import { TECollapse } from "tw-elements-react";


import {
    BriefcaseIcon, BuildingIcon,
    ChevronDown, ChevronRight, CircleIcon,
    Code, ContactIcon,
    HomeIcon,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music, NewspaperIcon, PersonStandingIcon,
    Settings, SettingsIcon,
    VideoIcon
} from "lucide-react";
import {usePathname} from "next/navigation";
import React, {useState} from "react";

const montserrat = Montserrat({ weight : "600", subsets : ["latin"]});

const routes = [
    {
        label : "Homeaaaa",
        icon : HomeIcon,
        href : "/",
        children : [
            {
                label : "Banner",
                href: "/admin-panel"
            },
            {
                label : "Experience",
                href: "/admin-panel/home/experience"
            },
            {
                label : "Achievements",
                href: "/admin-panel/home/achievement"
            },
            {
                label : "Customers",
                href: "/admin-panel/home/customers"
            },
        ]
    },
    {
        label : "Who We Are",
        icon : PersonStandingIcon,
        href : "/admin-panel/who-we-are",
        children: [
            {
                label : "Banner",
                href: "/admin-panel/who-we-are"
            },
            {
                label : "Subsidiaries",
                href: "/admin-panel/who-we-are/subsidiaries"
            },
            {
                label : "Vision & Mission",
                href: "/admin-panel/who-we-are/vision-mission"
            },
            {
                label : "Our DNA",
                href: "/admin-panel/who-we-are/our-dna"
            },
            {
                label : "Message From Director",
                href: "/admin-panel/who-we-are/message-from-director"
            },

        ]
    },
    {
        label : "Business",
        icon : BriefcaseIcon,
        href : "/images",
        children: []
    },
    {
        label : "Zero Capex",
        icon : CircleIcon,
        href : "/video",
        children: []
    },
    {
        label : "Media",
        icon : NewspaperIcon,
        href : "/music",
        children: [
            {
                label : "Category",
                href: "/admin-panel/media/category"
            },
            {
                label : "News",
                href: "/admin-panel/media/news"
            },
            {
                label : "Video",
                href: "/admin-panel/media/video"
            },
        ]
    },
    {
        label : "Career",
        icon : BuildingIcon,
        href : "/code",
        children: []
    },
    {
        label : "Get In Touch",
        icon : ContactIcon,
        href : "/get_in_touch",
        children: []
    },
    {
        label : "Setting",
        icon : SettingsIcon,
        href : "/setting",
        children: [
            {
                label : "SEO",
                href: "/"
            },
        ]
    },
]

const selectedRoute = {
    label: "Home",
    isExpanded: false
}

const Sidebar = ( {isMobile = false} ) => {
    const pathName = usePathname();
    const [selectedManu,setSelectedMenu] = useState(selectedRoute);

    return (
        <div className="flex h-full overflow-auto">
            <div className="space-y-4 py-4 flex flex-col h-full bg-white">
                <div className="px-6 py-2 flex-1" >
                    <Link href="/admin-panel" className="flex items-center mb-14">
                        <div className="relative h-8 w-36 mr-6">
                            <Image fill src="/images/logo_sesna.png" alt="logo" />
                        </div>
                        <h1 className={cn("text-xl font-bold ml-[-4]", montserrat.className)}>CMS</h1>
                    </Link>
                    <div className="space-y-1">
                        {routes.map(function(route, index, elements) {
                            const children = route.children.map(e=> e.href);

                            return (
                                <div className="flex flex-col space-y-1" key={route.href}>
                                    <Link onClick={ (e) => {
                                        if(route.children.length > 0) {
                                            e.preventDefault();
                                            setSelectedMenu({
                                                label: route.label,
                                                isExpanded: !selectedManu.isExpanded
                                            })
                                        }
                                    } } href={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition",  children.includes(pathName) ? "text-white bg-primary/60" : "text-zinc-600 hover:bg-primary/10")} >
                                        <div className="flex items-center flex-1">
                                            <route.icon className="h-5 w5 mr-5"/>
                                            <p className="w-full">
                                                {route.label}
                                            </p>

                                            <div className={cn("",route.children.length > 0 ? "block" : "hidden")}>
                                                {selectedManu.label === route.label && selectedManu.isExpanded ? (<ChevronDown className="w-5 h-5" />) : <ChevronRight className="w-5 h-5" />}

                                            </div>
                                        </div>
                                    </Link>
                                    <div className={cn("", selectedManu.isExpanded && selectedManu.label == route.label ? "block" : "hidden")}>
                                        {route.children.map(child => (
                                            <Link key={child.label} href={child.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition", pathName === child.href ? "text-primary" : "text-zinc-600 hover:bg-primary/10")} >
                                                <div className="flex items-center flex-1">
                                                    <div className="h-5 w-5 mr-6 flex items-center justify-center"><p>-</p></div>
                                                    {child.label}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={cn("w-px bg-gray-100", isMobile === true ? "hidden" : "")}></div>
        </div>
    )
}

export default Sidebar;