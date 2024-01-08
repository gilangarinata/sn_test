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
import {cn} from "@/lib/utils";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    FacebookShareCount,
    GabIcon,
    GabShareButton,
    HatenaIcon,
    HatenaShareButton,
    HatenaShareCount,
    InstapaperIcon,
    InstapaperShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    LivejournalIcon,
    LivejournalShareButton,
    MailruIcon,
    MailruShareButton,
    OKIcon,
    OKShareButton,
    OKShareCount,
    PinterestIcon,
    PinterestShareButton,
    PinterestShareCount,
    PocketIcon,
    PocketShareButton,
    RedditIcon,
    RedditShareButton,
    RedditShareCount,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TumblrShareCount,
    TwitterShareButton,
    ViberIcon,
    ViberShareButton,
    VKIcon,
    VKShareButton,
    VKShareCount,
    WeiboIcon,
    WeiboShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceIcon,
    WorkplaceShareButton,
    XIcon,
} from 'react-share';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {usePathname, useRouter} from "next/navigation";
import {Locale} from "@/i18n.config";


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


export default function CareerContent({lang, dictionary} : {lang: Locale, dictionary: any}) {
    const [depIds, setDepIds] = useState<string[]>([])
    const [achievements, setAchievements] = useState<CareerMdl[]>()
    const [departements, setDepartements] = useState<Departement[]>()
    const [totalBannersCount, setTotalBannersCount] = useState<number>()
    const [currentActivePage, setCurrentActivePage] = useState<number>()
    const [searchQuery, setSearchQuery] = useState<string>()
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [level, setLevel] = useState<String>("")
    const path = usePathname();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${path}`;
    async function getAchievements(depIds: string[], currentPage: number) {
        const achievements = await fetchCareerByDepIds(depIds, currentPage, searchQuery)
        const filteredAchievements = level === "" ? achievements?.careers : achievements
            ?.careers
            .filter(achievement => achievement.type === level)

        setAchievements(filteredAchievements as CareerMdl[]);
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
    }, [currentActivePage,depIds, searchQuery, level])

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (inputRef.current) {
                const searchQuery = inputRef.current.value;
                setSearchQuery(searchQuery);
            }
        }
    };

    return (
        <div className="w-full flex flex-col bg-[#15537A] h-[1200px] pt-10">
            <div className="flex flex-col px-10 lg:flex-row w-full max-w-7xl justify-center lg:justify-end gap-4">
                <Input onKeyDown={handleKeyDown} className="w-full lg:w-60" type="text" placeholder={dictionary.cari_pekerjaan} ref={inputRef} />
                <Button className="bg-[#FAC225] text-[#15537A]" onClick={(ev) => {
                    ev.preventDefault();
                    if (inputRef.current) {
                        const searchQuery = inputRef.current.value;
                        setSearchQuery(searchQuery);
                    }
                }}><SearchIcon className="mr-2" /> {dictionary.cari_lowongan}</Button>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:divide-x lg:divide-white">
                <div className="w-full lg:w-[500px] h-fit lg:h-[500px] flex flex-col px-10 gap-2">
                    <h1 className="mt-10 text-xl text-white font-bold mb-6">{dictionary.departemen}</h1>
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

                    <h1 className="mt-10 text-xl text-white font-bold mb-6">Level</h1>
                    <div  className="flex gap-4">
                        <Input type="checkbox" className="w-5 h-5" onChange={(event) => {
                            const isChecked = event.target.checked;
                            // const depId = event.target.value; // Assuming the value of the checkbox corresponds to a department ID

                            if (isChecked) {
                                // Add the department ID to the depIds array
                                // setDepIds([...depIds, departement._id]);
                                setLevel("Full-time")
                            } else {
                                // Remove the department ID from the depIds array
                                // setDepIds(depIds.filter(id => id !== departement._id));
                                setLevel("")
                            }
                        }}/>
                        <p className="text-white">Full-Time</p>
                    </div>
                    <div  className="flex gap-4">
                        <Input type="checkbox" className="w-5 h-5" onChange={(event) => {
                            const isChecked = event.target.checked;
                            // const depId = event.target.value; // Assuming the value of the checkbox corresponds to a department ID

                            if (isChecked) {
                                // Add the department ID to the depIds array
                                // setDepIds([...depIds, departement._id]);
                                setLevel("Internship")
                            } else {
                                // Remove the department ID from the depIds array
                                // setDepIds(depIds.filter(id => id !== departement._id));
                                setLevel("")
                            }
                        }}/>
                        <p className="text-white">Internship</p>
                    </div>
                </div>
                <div className="flex flex-col h-[500px] w-full px-10">
                    <h1 className="mt-10 text-2xl text-white font-bold">{dictionary.posisi_yang_tersedia}</h1>
                    <hr className="w-full border-white mt-4"/>
                    <p className={cn("text-white w-full mt-4",achievements?.length === 0 ? "block" : "hidden")}>{dictionary.lowongan_tidak_tersedia}</p>
                    {achievements?.map((position, index) => (
                        <div key={position.id} className="flex flex-col group w-full">
                            <Link href={`/career/${position._id}`} >
                                <div className="flex w-full">
                                    <div className="group-hover:block hidden bg-yellow-400 w-3 h-[150px]">
                                    </div>
                                    <div className="flex ml-4 hover:cursor-pointer py-10 gap-4 w-[100%]">
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col">
                                                <div className="flex justify-between">
                                                    <h1 className="text-2xl text-white font-bold">{position.title}</h1>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Share2Icon color="white" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-56">
                                                            <DropdownMenuLabel className="flex items-center justify-center gap-4">
                                                                <WhatsappShareButton
                                                                    url={URL}
                                                                    title={position.title ?? ""}
                                                                    separator=":: "
                                                                >
                                                                    <WhatsappIcon size={32} round />
                                                                </WhatsappShareButton>
                                                                <LinkedinShareButton url={URL}>
                                                                    <LinkedinIcon size={32} round />
                                                                </LinkedinShareButton>
                                                                <div className="Demo__some-network">
                                                                    <FacebookShareButton url={URL}>
                                                                        <FacebookIcon size={32} round />
                                                                    </FacebookShareButton>

                                                                </div>
                                                                <TwitterShareButton
                                                                    url={URL}
                                                                    title={position.title ?? ""}
                                                                >
                                                                    <XIcon size={32} round />
                                                                </TwitterShareButton>
                                                            </DropdownMenuLabel>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

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
                                                    <div className="flex gap-2">
                                                        <PinIcon color="white" />
                                                        <p className="text-white">{position.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <hr className="w-full border-white" />
                        </div>
                    ))}
                    <HorizontalPagination textColor="text-white" currentPage={currentActivePage ?? 1} totalPages={totalBannersCount ?? 1} onPageChange={(page) => {
                        setCurrentActivePage(page);
                    }} />
                </div>
            </div>
        </div>
    )
}