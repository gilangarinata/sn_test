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

export default function CareerContent() {
    return (
        <div className="w-full flex flex-col bg-[#15537A] items-center min-h-screen justify-center">
            <div className="flex w-full max-w-7xl justify-end gap-4">
                <Input className="w-60" type="text" placeholder="Cari pekerjaan" onChange={(e) => {
                }} />
                <Button className="bg-[#FAC225] text-[#15537A]"><SearchIcon className="mr-2" /> Cari Lowongan</Button>
            </div>
            <div className="w-full flex divide-x divide-white">
                <div className="w-[500px] h-[500px] flex flex-col px-10 gap-2">
                    <h1 className="mt-10 text-xl text-white font-bold mb-6">Departemen</h1>
                    {departenments.map((departement, index) => (
                        <div key={departement.title} className="flex gap-4">
                            <Input type="checkbox" className="w-5 h-5"/>
                            <p className="text-white">{departement.title}</p>
                        </div>
                        ))}
                </div>
                <div className="flex flex-col py-6 gap-8 h-[500px] w-full px-10 divide-y divide-white">
                    <h1 className="mt-10 text-2xl text-white font-bold">Posisi yang tersedia</h1>
                    {positions.map((position, index) => (
                        <Link href={position.url} key={position.id}>
                            <div className="flex gap-6 hover:cursor-pointer">
                                <div className="w-3 h-full bg-yellow-500 mt-2">
                                </div>
                                <div className="flex flex-col w-full gap-4 divide-y divide-white">
                                    <div className="flex flex-col pt-4 gap-4">
                                        <div className="flex justify-between">
                                            <h1 className="text-2xl text-white font-bold">{position.title}</h1>
                                            <Share2Icon color="white" />
                                        </div>
                                        <div className="flex">
                                            <div className="flex gap-2 w-80">
                                                <BriefcaseIcon color="white" />
                                                <p className="text-white">{position.departement}</p>
                                            </div>
                                            <div className="flex gap-2 w-40">
                                                <SignalIcon color="white" />
                                                <p className="text-white">{position.type}</p>
                                            </div>
                                            <div className="flex gap-2 w-40">
                                                <PinIcon color="white" />
                                                <p className="text-white">{position.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}