"use client";
import { motion } from "framer-motion"
import {ChevronDown, ChevronLeftCircle, ChevronRightCircle, Globe} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {News} from "@/components/admin/media/news/news-table";
import {Category} from "@/components/admin/media/category/category-table";
import HorizontalPagination from "@/components/pagination";
import {fetchCareerByDepIds} from "@/lib/actions/admin/career.action";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {fetchAllNews, fetchNewsByCategory} from "@/lib/actions/admin/news.action";
import {Video} from "@/components/admin/media/video/video-table";

export default function VideoContent({ videos } : { videos: Video[]}) {
    return (
        <div className="w-full flex flex-col mb-8 items-center justify-center">
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 w-full px-2 lg:min-w-[810px] max-w-5xl gap-4 mb-8">
                {videos?.map(content => {
                    const match = content.videoUrl.match(/[?&]v=([^&]+)/);
                    const videoId = match ? match[1] : 'not found';
                    return (
                        <div className="flex flex-col gap-4" key={content.title}>
                            <div className="relative w-full h-[250px]">
                                <Link href={"/media/video/"+content.id} >
                                    <Image fill src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt="" />
                                </Link>
                            </div>
                            <Link href={"/media/video/"+content.id} >
                                <h1 className="text-xl font-bold hover:text-yellow-400">{content.title}</h1>
                            </Link>
                            <p className="max-h-[165px] overflow-hidden text-justify" dangerouslySetInnerHTML={{__html: content.description}} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}