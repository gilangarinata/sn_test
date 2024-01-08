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
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {NewEditor} from "@/components/admin/media/news/new_editor";

export default function CareerDetail({career} : {career: CareerMdl}) {
    return (
        <div className="w-full px-10 flex flex-col bg-[#15537A] items-center min-h-screen">
            <div className="flex flex-col w-full gap-4 max-w-3xl">
                <div className="flex flex-col gap-4 divide-y sticky top-0 z-10 pt-[90px] bg-[#15537A]">
                    <div className="flex justify-between">
                        <h1 className="text-2xl text-white font-bold">{career.title}</h1>
                        <Link href={`/career/${career._id}/register`}>
                            <Button className="bg-[#FAC225] text-[#15537A]">Daftar Sekarang</Button>
                        </Link>
                    </div>
                    <div className="flex pt-6 pb-3">
                        <div className="flex gap-2 w-80">
                            <BriefcaseIcon color="white" />
                            <p className="text-white">{career.departement.name}</p>
                        </div>
                        <div className="flex gap-2 w-40">
                            <SignalIcon color="white" />
                            <p className="text-white">{career.type}</p>
                        </div>
                        <div className="flex gap-2 w-40">
                            <PinIcon color="white" />
                            <p className="text-white">{career.location}</p>
                        </div>
                    </div>
                </div>
                <NewEditor bgColor="#15537A" onChange={(val) => {}} initialContent={career?.description} editable={false} />
                {/*<p className="text-white" dangerouslySetInnerHTML={{__html: career.description}} />*/}
                {/*<h1 className="text-2xl font-bold text-white pt-20">Requirements</h1>*/}
                {/*<ul className="text-white">*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Requirement 1</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Requirement 2</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Requirement 3</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Requirement 4</li>*/}
                {/*    </div>*/}
                {/*</ul>*/}
                {/*<h1 className="text-2xl font-bold text-white pt-10">Job Description</h1>*/}
                {/*<ul className="text-white">*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Description 1</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Description 2</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Description 3</li>*/}
                {/*    </div>*/}
                {/*    <div className="flex gap-2 items-center">*/}
                {/*        <div className="w-3 h-3 rounded-full bg-white"></div>*/}
                {/*        <li>Description 4</li>*/}
                {/*    </div>*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}