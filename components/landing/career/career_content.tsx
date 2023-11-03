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
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Input} from "@/components/ui/input";
import Pagination from "@/components/pagination";
import HorizontalPagination from "@/components/pagination";
import {fetchWhySolar} from "@/lib/actions/admin/our-business/why-solar.action";
import {WhySolar} from "@/components/admin/our-business/why-solar/why-solar-table";
import {fetchCareerByDepIds} from "@/lib/actions/admin/career.action";
import Career from "@/lib/models/career.model";
import {Departement} from "@/components/admin/career/departement/departement-table";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {fetchDepartements} from "@/lib/actions/admin/departement.action";


// const departenments = [
//     {
//         url: '/',
//         title: "EPC",
//         checked: false,
//     },
//     {
//         url: '/',
//         title: "Deal Maker",
//         checked: false,
//     },
//     {
//         url: '/',
//         title: "Coorporate Management",
//         checked: false,
//     },
// ];
//
// const positions = [
//     {
//         url: '/career/1',
//         title: "Supply Chain Specialist",
//         departement: "EPC",
//         type: "Full Time",
//         location: "Jakarta",
//         id: "1"
//     },
//     {
//         url: '/career/2',
//         title: "PV Engineer",
//         departement: "EPC",
//         type: "Full Time",
//         location: "Jakarta",
//         id: "2"
//     },
// ];

export type CareerContent = {
    careers : CareerMdl[],
    isNext : boolean,
    totalBannersCount : number
}


export default function CareerContent() {
    const [depIds, setDepIds] = useState<string[]>([])
    const [achievements, setAchievements] = useState<CareerMdl[]>()
    const [departements, setDepartements] = useState<Departement[]>()
    const [totalBannersCount, setTotalBannersCount] = useState<number>()
    const [currentActivePage, setCurrentActivePage] = useState<number>()
    const [searchQuery, setSearchQuery] = useState<string>()
    const inputRef = useRef<HTMLInputElement | null>(null);

    async function getAchievements(depIds: string[], currentPage: number) {
        const achievements = await fetchCareerByDepIds(depIds, currentPage, searchQuery)
        setAchievements(achievements?.careers as CareerMdl[]);
        setTotalBannersCount(achievements?.totalPages)
    }

    async function getDepartements() {
        const achievements = await fetchDepartements()
        setDepartements(achievements?.banners)
    }

    useEffect(() => {
        getDepartements()
        getAchievements([], 1)
    }, [])

    useEffect(() => {
        getAchievements(depIds, currentActivePage ?? 1)
    }, [currentActivePage,depIds, searchQuery])

    return (
        <div className="w-full flex flex-col bg-[#15537A] h-[1200px] pt-10">
            <div className="flex flex-col px-10 lg:flex-row w-full max-w-7xl justify-center lg:justify-end gap-4">
                <Input className="w-full lg:w-60" type="text" placeholder="Cari pekerjaan" ref={inputRef} />
                <Button className="bg-[#FAC225] text-[#15537A]" onClick={(ev) => {
                    ev.preventDefault();
                    if (inputRef.current) {
                        const searchQuery = inputRef.current.value;
                        setSearchQuery(searchQuery);
                    }
                }}><SearchIcon className="mr-2" /> Cari Lowongan</Button>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:divide-x lg:divide-white">
                <div className="w-full lg:w-[500px] h-fit lg:h-[500px] flex flex-col px-10 gap-2">
                    <h1 className="mt-10 text-xl text-white font-bold mb-6">Departemen</h1>
                    {departements?.map((departement, index) => (
                        <div key={departement._id} className="flex gap-4">
                            <Input type="checkbox" className="w-5 h-5" onChange={(event) => {
                                const isChecked = event.target.checked;
                                // const depId = event.target.value; // Assuming the value of the checkbox corresponds to a department ID

                                if (isChecked) {
                                    // Add the department ID to the depIds array
                                    setDepIds([...depIds, departement._id]);
                                } else {
                                    // Remove the department ID from the depIds array
                                    setDepIds(depIds.filter(id => id !== departement._id));
                                }
                            }}/>
                            <p className="text-white">{departement.name}</p>
                        </div>
                        ))}
                </div>
                <div className="flex flex-col py-6 gap-8 h-[500px] w-full px-10 divide-y divide-white">
                    <h1 className="mt-10 text-2xl text-white font-bold">Posisi yang tersedia</h1>
                    {achievements?.map((position, index) => (
                        <Link href={`/career/${position._id}`} key={position.id}>
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
                                                <p className="text-white">{position.departement.name}</p>
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
                    <HorizontalPagination textColor="text-white" currentPage={currentActivePage ?? 1} totalPages={totalBannersCount ?? 1} onPageChange={(page) => {
                        setCurrentActivePage(page);
                    }} />
                </div>
            </div>
        </div>
    )
}