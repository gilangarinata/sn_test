"use client";
import { motion } from "framer-motion"
import {ChevronDown, ChevronLeftCircle, ChevronRightCircle, Globe} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn, formatDateString2} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React from "react";
import {News} from "@/components/admin/media/news/news-table";
import {Video} from "@/components/admin/media/video/video-table";
import YouTube from "react-youtube";


export default function VideoDetail({news} : {news : Video}) {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    const match = news.videoUrl.match(/[?&]v=([^&]+)/);
    const videoId = match ? match[1] : 'not found';
    return (
        <div className="w-full flex flex-col mx-auto max-w-5xl my-10 px-4">
            <div className="flex flex-col gap-16 md:flex-row md:gap-8">
                <div className="w-full flex flex-col gap-6">

                    <YouTube videoId={videoId}
                             opts={opts} />

                    <h1 className="text-3xl font-semibold">{news?.title}</h1>
                    <p className="text-gray-400">{news?.createdAt?.toLocaleTimeString()}</p>
                    <p className="text-justify" dangerouslySetInnerHTML={{__html: news?.description}} />
                </div>
            </div>
            <div></div>
        </div>
    )
}