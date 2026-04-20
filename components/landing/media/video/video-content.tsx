"use client";
import { motion } from "framer-motion"
import {ChevronDown, ChevronLeftCircle, ChevronRightCircle, Globe} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {cn, translateText} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {News} from "@/components/admin/media/news/news-table";
import {Category} from "@/components/admin/media/category/category-table";
import HorizontalPagination from "@/components/pagination";
import {fetchCareerByDepIds} from "@/lib/actions/admin/career.action";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {fetchAllNews, fetchNewsByCategory} from "@/lib/actions/admin/news.action";
import {Video} from "@/components/admin/media/video/video-table";
import {fetchAllVideos} from "@/lib/actions/admin/video.action";
import {Locale} from "@/i18n.config";
import CustomLink from "@/components/custom-link";
import MediaEmptyState from "@/components/landing/media/media-empty-state";

export default function VideoContent({ 
    categoryId, 
    videos, 
    categories, 
    lang, 
    dictionary  
} : { 
    categoryId?: string, 
    videos: Video[], 
    categories: Category[], 
    lang: Locale, 
    dictionary: any
}) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const categoryName = searchParams.get("category") || undefined;

    const [videosA, setVideosA] = useState<Video[]>()

    const [currentActivePage, setCurrentActivePage] = useState<number>(1)
    const [totalBannersCount, setTotalBannersCount] = useState<number>()

    async function getAchievements(currentPage: number) {
        const news = await fetchAllVideos(currentPage, 6, categoryId, undefined, categoryName)
        setVideosA(news?.banners as Video[])
        setTotalBannersCount(news?.totalPages as number)
    }

    // Reset to page 1 when category changes
    useEffect(() => {
        setCurrentActivePage(1);
    }, [categoryId, categoryName]);

    useEffect(() => {
        getAchievements(currentActivePage ?? 1 )
    }, [currentActivePage, categoryId, categoryName])

    return (
        <div className="w-full flex flex-col mb-8 items-center justify-center">
            <div className="w-full flex flex-col lg:flex-row justify-between p-6 max-w-5xl mx-auto items-center">
                <div className="w-full flex gap-4 overflow-x-auto pb-2 sm:pb-0">
                    <CustomLink lang={lang} href={pathName}>
                        <p className={cn(
                            "font-bold whitespace-nowrap cursor-pointer", 
                            !categoryName
                                ? "text-yellow-400 underline underline-offset-8" 
                                : "text-slate-700 hover:text-yellow-400"
                        )}>
                            {dictionary.all}
                        </p>
                    </CustomLink>
                    {categories.map(category => {
                        const translatedName = translateText(category.name, lang);
                        const isActive = categoryName?.toLowerCase() === translatedName?.toLowerCase();

                        return (
                            <CustomLink lang={lang} key={category.id} href={`${pathName}?category=${encodeURIComponent(translatedName)}`}>
                                <p className={cn(
                                    "font-bold whitespace-nowrap cursor-pointer", 
                                    isActive
                                        ? "text-yellow-400 underline underline-offset-8" 
                                        : "text-slate-700 hover:text-yellow-400"
                                )}>
                                    {translatedName}
                                </p>
                            </CustomLink>
                        );
                    })}
                </div>
            </div>

            <div className="w-full max-w-5xl mx-auto px-4 mb-8">
                {videosA !== undefined && videosA.length === 0 ? (
                    <MediaEmptyState 
                        title={dictionary.no_content} 
                        description={dictionary.no_content_desc} 
                    />
                ) : (
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
                        {videosA?.map(content => {
                            const match = content.videoUrl.match(/[?&]v=([^&]+)/);
                            const videoId = match ? match[1] : 'not found';
                            return (
                                <div className="flex flex-col gap-4" key={content.title}>
                                    <div className="relative w-full h-[250px]">
                                        <CustomLink lang={lang} href={"/media/video/detail/"+content.id} >
                                            <Image fill src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" />
                                        </CustomLink>
                                    </div>
                                    <CustomLink lang={lang} href={"/media/video/detail/"+content.id} >
                                        <h1 className="text-xl font-bold hover:text-yellow-400">{translateText(content.title, lang)}</h1>
                                    </CustomLink>
                                    <p className="max-h-[165px] overflow-hidden text-justify" dangerouslySetInnerHTML={{__html: translateText(content.description, lang)}} />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {(videosA && videosA.length > 0) && (
                <div className="w-full flex justify-end px-20">
                    <HorizontalPagination 
                        textColor="text-slate-500" 
                        currentPage={currentActivePage ?? 1} 
                        totalPages={totalBannersCount ?? 1} 
                        onPageChange={(page) => {
                            setCurrentActivePage(page);
                        }} 
                    />
                </div>
            )}
        </div>
    )
}