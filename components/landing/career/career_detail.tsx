"use client";
import { motion } from "framer-motion"
import {
    BriefcaseIcon,
    ChevronLeftCircle,
    ChevronRightCircle, LocateIcon, PinIcon,
    SearchIcon,
    Share2Icon,
    ShareIcon,
    SignalIcon
} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import React, {useEffect} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Input} from "@/components/ui/input";


const departenments = [
    {
        url: '/',
        title: "EPC",
        checked: false,
    },
    {
        url: '/',
        title: "Deal Maker",
        checked: false,
    },
    {
        url: '/',
        title: "Coorporate Management",
        checked: false,
    },
];

const positions = [
    {
        url: '/career/1',
        title: "Supply Chain Specialist",
        departement: "EPC",
        type: "Full Time",
        location: "Jakarta",
        id: "1"
    },
    {
        url: '/career/2',
        title: "PV Engineer",
        departement: "EPC",
        type: "Full Time",
        location: "Jakarta",
        id: "2"
    },
];

export default function CareerDetail() {
    return (
        <div className="w-full flex flex-col bg-[#15537A] items-center min-h-screen justify-center">
            <div className="flex flex-col w-full gap-4 max-w-7xl">
                <div className="flex flex-col pt-4 gap-4 divide-y">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-white font-bold">{positions[0].title}</h1>
                        <Link href="/career/1/register">
                            <Button className="bg-[#FAC225] text-[#15537A]">Daftar Sekarang</Button>
                        </Link>
                    </div>
                    <div className="flex pt-6">
                        <div className="flex gap-2 w-80">
                            <BriefcaseIcon color="white" />
                            <p className="text-white">{positions[0].departement}</p>
                        </div>
                        <div className="flex gap-2 w-40">
                            <SignalIcon color="white" />
                            <p className="text-white">{positions[0].type}</p>
                        </div>
                        <div className="flex gap-2 w-40">
                            <PinIcon color="white" />
                            <p className="text-white">{positions[0].location}</p>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white pt-20">Requirements</h1>
                <ul className="text-white">
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Requirement 1</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Requirement 2</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Requirement 3</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Requirement 4</li>
                    </div>
                </ul>
                <h1 className="text-2xl font-bold text-white pt-10">Job Description</h1>
                <ul className="text-white">
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Description 1</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Description 2</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Description 3</li>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <li>Description 4</li>
                    </div>
                </ul>
            </div>
        </div>
    )
}